import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

/**
 * @description Renders a button containing a link to create a new issue, redirecting
 * users to the "/issue/new" URL when clicked.
 *
 * @returns {JSX.Element} A React element that represents an HTML structure. It
 * consists of a div element containing a Button and a Link as its children. The
 * Button has the Link as its child, which links to "/issue/new".
 */
const IssuePage = () => {
  return (
    <div>
      <Button>
        <Link href="/issue/new"> New Issue</Link>
        </Button>
    </div>
  )
}

export default IssuePage