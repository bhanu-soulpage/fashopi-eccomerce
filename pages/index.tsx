import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SignUp from './signup'
export default function Home() {
  type Profile = {
    name : string,
    email : string,
    id : number,
  }


  return (
    <div>
      <SignUp />
    </div>
  )
}

// function getUserInfo()User {
  
// }
