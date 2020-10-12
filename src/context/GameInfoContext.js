import React, { createContext } from "react";

export const GameInfoContext = createContext({});

export const GameInfoProvider = GameInfoContext.Provider;

export const GameInfoConsumer = GameInfoContext.Consumer;
