import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Send, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });

        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
      } else {
        console.error("Email sending failed:", data.error);
        setIsSubmitting(false);

        toast({
          title: "Message failed to send",
          description: `There was an error sending your message: ${
            data?.error || "Unknown error"
          }`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      setIsSubmitting(false);

      toast({
        title: "Message failed to send",
        description:
          "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id='contact'
      className='py-20 md:py-32 bg-white dark:bg-gray-950 relative'
    >
      <div className='absolute inset-0 bg-linear-to-b from-white to-portfolio-50 dark:from-gray-950 dark:to-gray-900 z-0' />

      <div className='container mx-auto px-4 relative z-10'>
        <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center'>
          Get In Touch
        </h2>
        <div className='w-20 h-1 bg-portfolio-500 mx-auto mb-12'></div>

        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <Card className='border-none shadow-lg dark:bg-gray-800'>
            <CardContent className='p-6 md:p-8'>
              <h3 className='text-xl font-semibold text-slate-900 dark:text-white mb-6'>
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Honeypot: hidden from people, bots fill it in */}
                <input
                  type='text'
                  name='website'
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete='off'
                  aria-hidden='true'
                  className='hidden'
                />

                <div>
                  <Label
                    htmlFor='name'
                    className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1'
                  >
                    Name
                  </Label>
                  <Input
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder='Your name'
                    className='w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  />
                </div>

                <div>
                  <Label
                    htmlFor='email'
                    className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1'
                  >
                    Email
                  </Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder='Your email address'
                    className='w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  />
                </div>

                <div>
                  <Label
                    htmlFor='subject'
                    className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1'
                  >
                    Subject
                  </Label>
                  <Input
                    id='subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder='Message subject'
                    className='w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  />
                </div>

                <div>
                  <Label
                    htmlFor='message'
                    className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1'
                  >
                    Message
                  </Label>
                  <Textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder='How can I help you?'
                    className='w-full min-h-[150px] dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full bg-portfolio-600 hover:bg-portfolio-700 dark:bg-portfolio-600 dark:hover:bg-portfolio-700'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className='animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full' />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className='mr-2 h-4 w-4' />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className='flex flex-col justify-between items-center lg:items-start'>
            <div className='mb-8'>
              <h3 className='text-xl font-semibold text-center text-slate-900 dark:text-white mb-6 lg:text-left'>
                Contact Information
              </h3>

              <div className='space-y-4'>
                <div className='flex flex-col gap-2 items-center lg:items-start'>
                  <div className='flex items-center'>
                    <MapPin className='text-portfolio-600 dark:text-portfolio-400 h-5 w-5 mt-1 mr-3' />
                    <p className='text-slate-700 dark:text-slate-300'>
                      Portland, Oregon
                    </p>
                  </div>
                  <div className='flex gap-4'>
                    <p className='text-slate-500 dark:text-slate-400 text-sm'>
                      Available for remote work or in the ❤️ of Portland
                    </p>
                  </div>
                </div>
                <div className='flex flex-col gap-2 items-center lg:items-start'>
                  <div className='flex items-center'>
                    <Download className='text-portfolio-600 dark:text-portfolio-400 h-5 w-5 mr-2' />
                    <span className='text-slate-700 dark:text-slate-300'>
                      Download Resume
                    </span>
                  </div>
                  <div className='flex gap-4'>
                    <a
                      href='/JeremySellResume.docx'
                      download
                      className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 group'
                    >
                      DOCX
                    </a>
                    <a
                      href='/JeremySellResume.pdf'
                      download
                      className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 group'
                    >
                      PDF
                    </a>
                  </div>
                </div>
                <div className='flex items-center justify-center lg:justify-start'>
                  <Mail className='text-portfolio-600 dark:text-portfolio-400 h-5 w-5 mr-3' />
                  <a
                    href='mailto:contact@jeremysell.com'
                    className='text-slate-700 dark:text-slate-300 hover:text-portfolio-600 dark:hover:text-portfolio-400'
                  >
                    contact@jeremysell.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-center text-slate-900 mb-6 dark:text-white lg:text-left'>
                Connect with me
              </h3>

              <div className='flex gap-4'>
                <a
                  href='https://github.com/thestereoscopics'
                  className='bg-slate-100 hover:bg-portfolio-100 text-slate-700 hover:text-portfolio-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-300 dark:hover:text-portfolio-400 p-3 rounded-full transition-colors'
                  aria-label='GitHub'
                >
                  <Github className='h-6 w-6' />
                </a>

                <a
                  href='https://www.linkedin.com/in/selljeremy/'
                  className='bg-slate-100 hover:bg-portfolio-100 text-slate-700 hover:text-portfolio-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-300 dark:hover:text-portfolio-400 p-3 rounded-full transition-colors'
                  aria-label='LinkedIn'
                >
                  <Linkedin className='h-6 w-6' />
                </a>

                <a
                  href='mailto:contact@jeremysell.com'
                  className='bg-slate-100 hover:bg-portfolio-100 text-slate-700 hover:text-portfolio-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-300 dark:hover:text-portfolio-400 p-3 rounded-full transition-colors'
                  aria-label='Email link'
                >
                  <Mail className='h-6 w-6' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
