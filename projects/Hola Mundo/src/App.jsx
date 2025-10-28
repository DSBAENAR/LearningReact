import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
import React from 'react'
export function App() {
return(
    <>
        <TwitterFollowCard username="Facebook" name="Meta" />
        <TwitterFollowCard username="Google" name="Google" />
        <TwitterFollowCard username="instagram" name="Instagram" />
        <TwitterFollowCard username="Netflix" name="Netflix" />
        <TwitterFollowCard username="Twitch" name="twitch" />
    </>
)
}