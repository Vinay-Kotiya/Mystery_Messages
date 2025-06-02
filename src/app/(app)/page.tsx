"use client";
import messages from "@/data/messages.json";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import Footer from "@/components/Footer";
import DotGrid from "@/ReactBits/DotGrid/DotGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  // console.log("data of user:", session);
  // const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  return (
    <>
      <main className="flex justify-center items-center w-full  flex-col px-4 md:px-24 py-12">
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor={"#000"}
          activeColor={"#00d8ff"}
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
        <div className=" backdrop-blur p-3 rounded-2xl">
          <section className="text-center mb-8 md:mb-12 z-50  ">
            <h1 className="text-3xl md:text-5xl font-bold">
              Dive into the World of Anonymous Conversation
            </h1>
            <p className="text-base mt-3 md:mt-4 md:text-xl">
              {/* Explore Mystery Messages - Where your identity remains secret. */}
              Speak Freely. Stay Hidden. - Send and receive anonymous messages
              without revealing your identity.
            </p>
          </section>
          <div className="flex md:flex-row flex-col  justify-center items-center">
            {session && session.user ? (
              <div className="md:w-1/2 flex flex-col gap-5 text-center md:text-start">
                <h1 className="text-2xl md:text-4xl font-bold">
                  Welcome back, {session.user.username}!
                  {/* Get start your Anonymous Messages by Login */}
                </h1>
                <p className="text-xl md:text-2xl font-bold text-gray-800">
                  Ready to dive into the mystery? Your next anonymous message
                  awaits...
                </p>
                <Link href="/dashboard">
                  <Button
                    className="w-auto text-2xl p-5 bg-gray-900 py-7 text-white"
                    variant={"outline"}
                  >
                    See Messages
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="md:w-1/2 flex flex-col gap-5">
                <h1 className="text-3xl md:text-5xl font-bold">
                  Get Started Now
                  {/* Get start your Anonymous Messages by Login */}
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  Log in to Begin Your Anonymous Journey
                </p>
                <Link href="/sign-in">
                  <Button
                    className="w-full md:w-auto text-2xl p-5  bg-gray-900 py-7 text-white"
                    variant={"outline"}
                  >
                    Login Now
                  </Button>
                </Link>
              </div>
            )}

            <Carousel
              plugins={[Autoplay({ delay: 2000 })]}
              className="max-w-xs min-w-2xs z-50 mt-5"
            >
              <CarouselContent>
                {messages.map((message, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardHeader>{message.title}</CardHeader>
                        <CardContent className="flex aspect-square items-center justify-center p-6 ">
                          <span className="text-3xl font-semibold">
                            {message.content}
                          </span>
                        </CardContent>
                        <CardFooter>{message.received}</CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
                {/* {Array.from({ length: 5 }).map((_, index) => (
           
          ))} */}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;

// {session && session.user ? (
//               <div className="md:w-1/2 flex md:hidden flex-col gap-5 mt-5 text-center">
//                 <h1 className="text-2xl md:text-4xl font-bold">
//                   Welcome back, {session.user.username}!
//                   {/* Get start your Anonymous Messages by Login */}
//                 </h1>
//                 <p className="text-xl md:text-2xl font-bold text-gray-800">
//                   Ready to dive into the mystery? Your next anonymous message
//                   awaits...
//                 </p>
//                 <Link href="/dashboard">
//                   <Button
//                     className="w-auto text-2xl p-5 bg-slate-100 text-black"
//                     variant={"outline"}
//                   >
//                     See Messages
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="md:w-1/2 flex md:hidden flex-col gap-5 mt-5 text-center">
//                 <h1 className="text-3xl md:text-5xl font-bold">
//                   Get Started Now
//                   {/* Get start your Anonymous Messages by Login */}
//                 </h1>
//                 <p className="text-2xl md:text-3xl font-bold text-gray-800">
//                   Log in to Begin Your Anonymous Journey
//                 </p>
//                 <Link href="/sign-in">
//                   <Button
//                     className=" w-auto text-2xl p-5 bg-slate-100 text-black"
//                     variant={"outline"}
//                   >
//                     Login Now
//                   </Button>
//                 </Link>
//               </div>
//             )}
