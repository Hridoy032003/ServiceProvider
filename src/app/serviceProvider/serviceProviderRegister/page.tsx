import { CompanyRegistrationForm } from "@/components/serviceComponent/CompanyRegistrationForm";



export default function RegisterCompanyPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Register Your Company</h1>
      <p className="text-muted-foreground mb-8">
        Fill out the details below to get started as a service provider.
      </p>
      <CompanyRegistrationForm />
    </div>
  );
}
