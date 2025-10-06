import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Wallet, Lock } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment successful! Booking confirmed.");
    setTimeout(() => navigate("/learner-dashboard"), 1500);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 animate-fade-in">Secure Payment</h1>
          <p className="text-muted-foreground mb-8">Complete your booking with a secure payment</p>
          
          <div className="grid gap-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="font-medium">Credit / Debit Card</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <span className="font-medium">UPI</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="h-5 w-5 text-primary" />
                      <span className="font-medium">Wallet</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card className="animate-slide-in">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  {paymentMethod === "card" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            placeholder="123"
                            type="password"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </>
                  )}
                  
                  {paymentMethod === "upi" && (
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        id="upiId" 
                        placeholder="yourname@upi"
                        required
                      />
                    </div>
                  )}
                  
                  {paymentMethod === "wallet" && (
                    <div className="space-y-2">
                      <Label htmlFor="walletPhone">Phone Number</Label>
                      <Input 
                        id="walletPhone" 
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                        required
                      />
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total Amount</span>
                      <span className="text-2xl font-bold text-primary">₹170</span>
                    </div>
                    
                    <Button type="submit" className="w-full btn-gradient" size="lg">
                      <Lock className="mr-2 h-5 w-5" />
                      Pay Securely
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
