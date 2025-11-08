import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Leaf, Star } from "lucide-react";

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isVeg: boolean;
  rating?: number;
  onAddToCart: (id: string) => void;
}

export const MenuCard = ({
  name,
  description,
  price,
  imageUrl,
  isVeg,
  rating,
  onAddToCart,
  id,
}: MenuCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="aspect-video bg-muted overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Leaf className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          {isVeg && (
            <Badge className="bg-green-500 hover:bg-green-600">
              <Leaf className="h-3 w-3 mr-1" />
              Veg
            </Badge>
          )}
          {!isVeg && (
            <Badge variant="destructive">
              Non-Veg
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">{name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating?.toFixed(1) || "4.0"}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <p className="text-2xl font-bold text-primary">₹{price}</p>
        <Button onClick={() => onAddToCart(id)} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};