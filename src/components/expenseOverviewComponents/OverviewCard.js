import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

function OverviewCard({cardTitle, value}) {
  return (
    <Card>
  <CardHeader>
    <CardTitle>{cardTitle}</CardTitle>
    {/* <CardDescription>Card Description</CardDescription> */}
  </CardHeader>
  <CardContent>
    <p className='text-2xl text-white font-semibold tracking-wider'>{value}</p>
  </CardContent>
  {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
</Card>

  )
}

export default OverviewCard