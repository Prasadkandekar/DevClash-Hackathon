import React from "react";
import Routings from "./PageRouting/Routings";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'


function App() {
  return (
    <>
    <header>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
  <Routings/>
    </>
  )
}

export default App;
