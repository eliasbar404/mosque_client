"use client"

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Sample article data
const articles = [
  { id: 1, title: "Article 1", description: "Description for Article 1" },
  { id: 2, title: "Article 2", description: "Description for Article 2" },
  { id: 3, title: "Article 3", description: "Description for Article 3" },
  { id: 4, title: "Article 4", description: "Description for Article 4" },
  { id: 5, title: "Article 5", description: "Description for Article 5" },
]

export default function ResponsiveArticleSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1 })
  const [slidesToShow, setSlidesToShow] = useState(3)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 641) {
        setSlidesToShow(1)
      } else if (window.innerWidth >= 641 && window.innerWidth <= 768) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
    }

    handleResize() // Call once to set initial state
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({ slidesToScroll: 1, align: 'start' })
    }
  }, [emblaApi, slidesToShow])

  return (
    <div className="relative mx-4 px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex ">
          {articles.map((article) => (
            <div
              key={article.id} 
              className={`flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2`}
            >
              <Card>
                <div className="relative w-full h-48">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{article.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Read more</Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}