import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

function OverviewCard({cardTitle, value, info}) {
  return (
    <Card>
  <CardHeader>
    <CardTitle>{cardTitle}</CardTitle>
    {/* <CardDescription>Card Description</CardDescription> */}
  </CardHeader>
  <CardContent>
    <p className='tracking-wider text-gray-500 mb-4 text-[0.9rem]'>{info}</p>
    <p className='text-2xl text-white font-semibold tracking-wider'>{value} /-</p>
  </CardContent>
  {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
</Card>

  )
}

export default OverviewCard