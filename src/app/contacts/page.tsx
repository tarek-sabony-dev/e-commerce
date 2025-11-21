import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center mb-8">Contacts Page</h1>
      <Card>
        <CardContent>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">Message</label>
              <Input id="message" placeholder="Enter your message" />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}