
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import LowCardGame from "./LowCardGame";
import DiceGame from "./DiceGame";
import CricketGame from "./CricketGame";

const GameSelection = () => {
  const [activeGame, setActiveGame] = useState("lowcard");

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs defaultValue="lowcard" onValueChange={setActiveGame} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="lowcard">LowCard</TabsTrigger>
            <TabsTrigger value="dice">Dice</TabsTrigger>
            <TabsTrigger value="cricket">Cricket</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lowcard">
            <LowCardGame />
          </TabsContent>
          
          <TabsContent value="dice">
            <DiceGame />
          </TabsContent>
          
          <TabsContent value="cricket">
            <CricketGame />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GameSelection;
