import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Store,
  ShoppingBag,
  TrendingUp,
  Users,
  Zap,
  DollarSign,
  Shield,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  Sparkles,
  Target,
  Globe,
  BarChart3,
  Heart,
  Gift,
  Rocket,
  Award,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LeaderboardTable from "../components/leaderboard/Leaderboard";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Store,
      title: "Create Your Store",
      description:
        "Launch your own online store in minutes with our easy-to-use platform. No technical skills required!",
    },
    {
      icon: ShoppingBag,
      title: "Curate Products",
      description:
        "Select from our premium catalog and add products to your store with just one click",
    },
    {
      icon: TrendingUp,
      title: "Share & Earn",
      description:
        "Share your unique referral link and earn points on every order. The more you share, the more you earn!",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Quick Setup",
      description:
        "Get your store up and running in under 5 minutes. No waiting, no delays.",
      color: "text-primary",
    },
    {
      icon: DollarSign,
      title: "Zero Investment",
      description:
        "Start completely free. No upfront costs, no hidden fees. Earn from day one.",
      color: "text-accent",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Your data and earnings are protected with enterprise-grade security.",
      color: "text-primary",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Reach customers worldwide. Your store works 24/7, everywhere.",
      color: "text-secondary",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Track your performance with detailed analytics and insights.",
      color: "text-accent",
    },
    {
      icon: Gift,
      title: "Rewards Program",
      description: "Earn points, unlock bonuses, and climb the leaderboard.",
      color: "text-primary",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Sign Up Free",
      description: "Create your account in seconds. No credit card required.",
      icon: Rocket,
    },
    {
      step: "2",
      title: "Choose Products",
      description: "Browse and select products from our extensive catalog.",
      icon: ShoppingBag,
    },
    {
      step: "3",
      title: "Get Your Link",
      description:
        "Receive your unique referral code and store link instantly.",
      icon: Gift,
    },
    {
      step: "4",
      title: "Start Earning",
      description:
        "Share your links and watch your earnings grow automatically.",
      icon: TrendingUp,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content:
        "I've been using this platform for 3 months and already earned over $2,000! The setup was so easy and the support team is amazing.",
      rating: 5,
      earnings: "$2,400",
    },
    {
      name: "Michael Chen",
      role: "Student",
      content:
        "Perfect side hustle for students! I share my store link on social media and earn passive income while focusing on my studies.",
      rating: 5,
      earnings: "$1,200",
    },
    {
      name: "Emily Rodriguez",
      role: "Stay-at-Home Mom",
      content:
        "This changed my life! I can earn money from home while taking care of my kids. The best part? It's completely free to start.",
      rating: 5,
      earnings: "$3,100",
    },
  ];

  const faqs = [
    {
      question: "Is it really free to start?",
      answer:
        "Yes! Creating your store is completely free. There are no upfront costs, no monthly fees, and no hidden charges. You only earn when your referrals make purchases.",
    },
    {
      question: "How do I earn money?",
      answer:
        "When someone clicks your referral link and makes a purchase, you earn points that can be converted to cash. The more products you share, the more opportunities to earn!",
    },
    {
      question: "How quickly can I start earning?",
      answer:
        "You can start earning immediately after creating your store and sharing your links. Some users see their first sale within hours of signing up!",
    },
    {
      question: "Do I need technical skills?",
      answer:
        "Not at all! Our platform is designed for everyone. If you can use social media, you can run your store. We provide all the tools and support you need.",
    },
    {
      question: "How do I get paid?",
      answer:
        "Earnings are tracked in real-time in your dashboard. You can view your points and earnings history anytime. Payment processing is handled securely through our platform.",
    },
    {
      question: "Can I manage multiple stores?",
      answer:
        "Currently, each account can manage one store. However, you can add unlimited products to your store and customize it to match your brand.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative px-6 py-24 md:py-32 overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-pulse">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Start Earning From Home Today
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Build Your Store,
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Earn From Anywhere
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create your own ecommerce store, curate products, and earn
              commissions by sharing your unique referral link.
              <span className="block mt-2 text-lg">
                No investment required. Start earning today!
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 py-6 h-auto"
              >
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Setup in 5 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Start Earning Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved Up */}
      <section className="px-6 py-16 bg-background border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-8 h-8 text-primary" />
                <div className="text-4xl md:text-5xl font-bold text-foreground">
                  1000+
                </div>
              </div>
              <p className="text-muted-foreground font-medium">
                Active Store Owners
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShoppingBag className="w-8 h-8 text-primary" />
                <div className="text-4xl md:text-5xl font-bold text-foreground">
                  5000+
                </div>
              </div>
              <p className="text-muted-foreground font-medium">
                Products Available
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-8 h-8 text-accent" />
                <div className="text-4xl md:text-5xl font-bold text-foreground">
                  $50K+
                </div>
              </div>
              <p className="text-muted-foreground font-medium">
                Earned by Users
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-8 h-8 text-accent" />
                <div className="text-4xl md:text-5xl font-bold text-foreground">
                  4.9/5
                </div>
              </div>
              <p className="text-muted-foreground font-medium">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Award className="w-3 h-3 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built the perfect platform for entrepreneurs who want to
              start earning without the hassle
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Target className="w-3 h-3 mr-2" />
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple Steps to Success
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes and start earning today
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-6 py-20 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Rocket className="w-3 h-3 mr-2" />
              Your Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Path to Success
            </h2>
            <p className="text-lg text-muted-foreground">
              Four simple steps to start earning
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -z-10">
                    <div className="w-16 h-16 rounded-full bg-primary/10"></div>
                  </div>
                  <div className="absolute top-8 -left-4 w-8 h-8 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[75%] w-[50%] h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <LeaderboardTable />
      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Heart className="w-3 h-3 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join Thousands of Happy Earners
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our users are saying about their experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Earned</p>
                    <p className="text-lg font-bold text-accent">
                      {testimonial.earnings}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <HelpCircle className="w-3 h-3 mr-2" />
              Got Questions?
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know to get started
            </p>
          </div>
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
            <Zap className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Limited Time: Join Free Today
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs earning from home. Create your store
            in minutes and start earning today. No investment required!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/auth")}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto group"
            >
              Create Your Store Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="bg-transparent border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            >
              Learn More
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Instant Setup</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
