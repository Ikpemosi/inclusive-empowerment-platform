
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const VolunteerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "volunteers"), {
        name,
        email,
        phone,
        skills,
        availability,
        submittedAt: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Your volunteer application has been submitted successfully!",
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setSkills("");
      setAvailability("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="What skills can you contribute?"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
          className="min-h-[100px]"
        />
      </div>
      <div>
        <Textarea
          placeholder="When are you available to volunteer?"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          required
          className="min-h-[100px]"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default VolunteerForm;
