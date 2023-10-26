import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import Page from '@/components/Page'
import Loading from '@/components/Loading'
import Polls from '@/components/Polls'
import SetUserName from '@/components/SetUserName'
import { useProfile, useProfileQuery } from '@/lib/api'

import { useTrans } from '@/lib/trans'

export default function Index() {
  const router = useRouter()
  const profile = useProfile()

  if (profile === undefined) return <Loading />
  
  if (profile === null) {
    router.push('/api/auth/signin')
    return <Loading />
  }

  if (profile.isViewer) {
    router.push('/report')
    return <Loading />
  }

  return <Home/>
}

function Home() {
  const profileQuery = useProfileQuery()
  const profile = profileQuery.data
  const _ = useTrans()

  if (profile===undefined) return <Loading/>

  if (!profile) {
    /* l'utente aveva una sessione ma evidentemente non esiste più nel db */
    signOut()
    return <Loading />
  }

  return <Page>
    <h1>{(globalThis as any).SITE_TITLE}</h1>
    {!profile.name && <SetUserName profile={profile} mutate={profileQuery.mutate}/>}
    <p>{_('Benvenuto %!', profile.name || profile.username || profile.email)}</p>
    <Polls />  
  </Page>
}
