import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
    const { authUser } = useAuthStore();

    return (
        <div>   <h1><button class="btn btn-neutral">Neutral</button>
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-accent">Accent</button>
            <button class="btn btn-info">Info</button>
            <button class="btn btn-success">Success</button>
            <button class="btn btn-warning">Warning</button>
            <button class="btn btn-error">Error</button></h1></div>
    )
}

export default Navbar