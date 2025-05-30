"use client";
import messages from "@/data/messages.json";
import {
  Card,
  CardContent,
  CardDescription,
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
import useEmblaCarousel from "embla-carousel-react";
import Footer from "@/components/Footer";

const Home = () => {
  // const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  return (
    <>
      <main className="flex justify-center items-center w-full flex-col px-4 md:px-24 py-12">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Conversation
          </h1>
          <p className="text-base mt-3 md:mt-4 md:text-xl">
            Explore Mystery Messages - Where your identity remains secret.
          </p>
        </section>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="max-w-xs min-w-2xs"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader>{message.title}</CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
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
      </main>
      <Footer />
    </>
  );
};

export default Home;
