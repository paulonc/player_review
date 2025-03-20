import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Header
        title="Contato"
        subtitle="Fale com a gente e compartilhe sua opinião sobre os games!"
      />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Send your Message
              </h2>
              <ContactForm />
            </div>
            <div className="p-8 bg-gray-100">
              <ContactInfo />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
