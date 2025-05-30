"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
export default function Footer() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <footer className="bg-zinc-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex md:flex-row justify-between gap-6 ">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold ">Mystery Messages</h1>
          <p className="text-sm text-zinc-400 mt-2">
            Send and receive anonymous messages with a mysterious twist.
          </p>
        </div>

        {/* Quick Links
        <div>
          <h2 className="text-lg font-semibold mb-3 text-purple-300">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-purple-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/messages" className="hover:text-purple-400">
                Messages
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-400">
                Contact
              </Link>
            </li>
          </ul>
        </div> */}
        {/* <div className="flex">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
        </div> */}

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold mb-3 ">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://github.com/Vinay-Kotiya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/vinay-kotiya-a405b6316/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400"
            >
              <Linkedin />
            </a>
            <a
              href="https://www.instagram.com/vinay_kotiya7714_/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400"
            >
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-zinc-500 mt-8 border-t border-zinc-700 pt-4">
        © {new Date().getFullYear()} Mystery Messages. Built with 💜 by Vinay.
      </div>
    </footer>
  );
}
