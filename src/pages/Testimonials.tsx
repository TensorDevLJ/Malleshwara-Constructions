/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Plus, User, Calendar, CheckCircle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

const Testimonials = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    rating: 5,
    comment: "",
    location: "", // optional
  });

  


  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const services = [
    "Fence Installation",
    "Construction Materials",
    "Labor Services",
    "Wedding Catering",
    "Event Catering",
    "Other",
  ];

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const response = await apiService.getTestimonials({ limit: 20 });
      setTestimonials(response.data.testimonials);
    } catch (error) {
      console.error("Load error:", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.comment.trim().length < 10) {
      toast({
        title: "Validation Error",
        description: "Comment must be at least 10 characters.",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiService.createTestimonial(formData);
      toast({
        title: "Thank you!",
        description: "Your testimonial has been submitted successfully.",
      });

      setFormData({
        name: "",
        email: "",
        service: "",
        rating: 5,
        comment: "",
        location: "",
      });

      setShowForm(false);
      loadTestimonials();
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Could not submit testimonial.",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (n: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
            ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
          onClick={() => interactive && onRate?.(i)}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-hero text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t("testimonials.title") || "Testimonials"}</h1>
          <p className="text-lg max-w-xl mx-auto">
            {t("testimonials.subtitle") || "What our clients are saying"}
          </p>
        </div>
      </section>

      {/* Add Button */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Customer Feedback</h2>
          <Button variant="hero" onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" /> Add Review
          </Button>
        </div>
      </section>

      {/* Form */}
      {showForm && (
        <section className="bg-accent/5 py-10">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Share your experience</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Service *</Label>
                    <select
                      required
                      className="w-full p-2 border rounded-md"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Rating *</Label>
                    {renderStars(formData.rating, true, (rating) =>
                      setFormData({ ...formData, rating })
                    )}
                  </div>

                  <div>
                    <Label>Comment *</Label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Share your experience (minimum 10 characters)"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Location (optional)</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Testimonials List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <p>Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p>No testimonials yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t._id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex justify-center items-center">
                        <User className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{t.name}</h4>
                        <small className="text-muted-foreground">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      {t.isVerified && (
                        <Badge className="ml-auto">
                          <CheckCircle className="w-4 h-4 mr-1" /> Verified
                        </Badge>
                      )}
                    </div>
                    <div className="mb-2">{renderStars(t.rating)}</div>
                    <Quote className="w-6 h-6 text-accent/40" />
                    <p className="italic text-muted-foreground mt-2">{t.comment}</p>
                    <div className="text-sm mt-4 flex justify-between pt-4 border-t">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {t.service}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(t.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
