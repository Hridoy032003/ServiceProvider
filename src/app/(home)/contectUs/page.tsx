
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Building, Target, Users } from "lucide-react";
import FeedBack from "@/components/FeedBack";
import { getAuthSession } from "@/lib/auth";


export default async function AboutAndContactPage() {
    const session = await getAuthSession();

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              About Our Company
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We are a passionate team dedicated to creating innovative
              solutions that empower our users and drive progress in the
              industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground mt-2">
                To build reliable, scalable, and user-friendly products that
                solve real-world problems and deliver exceptional value.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="text-muted-foreground mt-2">
                To be a leading innovator in our field, recognized for our
                commitment to quality, customer satisfaction, and ethical
                practices.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Our Team</h3>
              <p className="text-muted-foreground mt-2">
                Comprised of diverse, talented individuals who collaborate to
                push boundaries and achieve excellence together.
              </p>
            </div>
          </div>

          {/* Team Section (Optional but Recommended) */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Meet Our Developer
            </h2>
            <div className="flex justify-center flex-wrap gap-8">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-2">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/202388839?v=4"
                    alt="Team Member 1"
                  />
                  <AvatarFallback>Hridoy</AvatarFallback>
                </Avatar>
                <h4 className="font-semibold">Hridoy Sarkar</h4>
                <p className="text-sm text-muted-foreground">Full Stack Developer</p>
              </div>
             
            </div>
          </div>
        </div>

       
        <div className="border-b mb-20"></div>

        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or a project in mind? We'd love to hear from you.
              Fill out the form or use our contact details below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
           <FeedBack email={session?.user?.email}/>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-muted-foreground">
                      <a
                        href="mailto:hello@yourapp.com"
                        className="hover:underline"
                      >
                        hridoy03102003@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+1234567890" className="hover:underline">
                        9016538**
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Office Address</h3>
                    <p className="text-muted-foreground">
                      123 Airport road , surat City, 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
