import Head from 'next/head'

import SiteFooter from 'components/SiteFooter'
import SiteNavigation from "components/SiteNavigation"

export default function Layout({children}) {

  return (
    <>
      <Head>
        <title>BarkBox Personalization Engine</title>
      </Head>

      <SiteNavigation />

      <main>{children}</main>

      <SiteFooter />
    </>
  ) 
}