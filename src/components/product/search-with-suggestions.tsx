'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '../ui/input'
import { GetSearchSuggestions } from '@/app/actions/product-actions'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command'
import { Button } from '../ui/button'
import { IconSearch } from '@tabler/icons-react'
import { Popover, PopoverAnchor, PopoverContent } from '../ui/popover'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError } from '../ui/field'

interface SearchSuggestion {
  id: number
  name: string
}

const formSchema = z  .object({
  query: z.string()
})

export default function SearchAutocomplete({ searchQuery } : { searchQuery: string }) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter()
  const searchParams = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: searchQuery
    },
  })

  const fetchSuggestions = async (query: string) => {
    if (!query || query.trim().length === 0) {
      setSuggestions([])
      return
    }

    try {
      const results = await GetSearchSuggestions(query, 3)
      setSuggestions(results)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    }
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams.toString())
    const q = data.query

    if (!q || q.trim().length === 0) {
      params.delete('q')
    } else {
      params.set('q', q)
    }

    router.push(`/shop?${params.toString()}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('query', e.target.value)
    fetchSuggestions(e.target.value)
    setIsPopoverOpen(true)
  }
  
  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    onSubmit({ query: suggestion.name })
    setIsPopoverOpen(false)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverAnchor asChild>
        <form onSubmit={form.handleSubmit(onSubmit)} id="search-query-form" className="flex gap-2 relative">
          <Controller 
            name="query"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="search-query"
                  placeholder="Search products..."
                  onChange={handleInputChange}
                  autoComplete={"off"}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button variant={"secondary"} type="submit" form="search-query-form">
            <IconSearch />
            <span className="hidden lg:block">Search</span>
          </Button>
        </form>
      </PopoverAnchor>
      <PopoverContent
        className="w-full "
        // This prevents the Popover from stealing focus from the Input
        onOpenAutoFocus={(e) => e.preventDefault()}
        side="bottom"
        align="start"
      >
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandEmpty>No results found.</CommandEmpty>
              {suggestions.map((suggestion) => (
                <CommandItem 
                  key={suggestion.id} 
                  value={suggestion.name} 
                  onSelect={(e) => {
                    handleSelectSuggestion(suggestion);
                  }} 
                >
                  {suggestion.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

