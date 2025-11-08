import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const Checkout = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "wallet" | "cash">("upi");
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlaceOrder = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { data: cartData, error: cartError } = await supabase
        .from("cart_items")
        .select(`
          quantity,
          menu_items (id, name, price)
        `)
        .eq("user_id", user.id);

      if (cartError) throw cartError;
      if (!cartData || cartData.length === 0) {
        toast({
          title: "Cart is empty",
          description: "Please add items to your cart first",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      const total = cartData.reduce((sum: number, item: any) => {
        return sum + (parseFloat(item.menu_items.price) * item.quantity);
      }, 0);

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: total,
          payment_method: paymentMethod,
          special_instructions: instructions || null,
          status: "pending",
          payment_status: paymentMethod === "cash" ? "pending" : "completed",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartData.map((item: any) => ({
        order_id: orderData.id,
        menu_item_id: item.menu_items.id,
        quantity: item.quantity,
        unit_price: parseFloat(item.menu_items.price),
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      toast({
        title: "Order placed successfully!",
        description: "Your order will be ready soon",
      });

      navigate("/orders");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet">Wallet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions (Optional)</Label>
              <Textarea
                id="instructions"
                placeholder="Any special requests for your order..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;