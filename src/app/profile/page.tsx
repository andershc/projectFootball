'use client'
import React from "react";
import Image from "next/image";
import { useAuthContext } from "../../../lib/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./profile-page.module.css";
import signOutUser from "../../../firebase/auth/signout";
import Button from "../../components/button/Button";
function ProfilePage() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [router, user])

    const handleSignOut = async () => {
        const { result, error } = await signOutUser();
        if (error) {
            return console.log(error)
        }
        // else successful
        console.log("Result ", result)
        return router.push("/signIn")
    }

    return (
        <main>
        <section className={styles.profile}>
          <div className="">
            <Image
              src={require(user?.['photoURL'] || '/static/images/hacker.png')}
              alt="Profile Image"
              width={150}
              height={150}
              className={styles.profileImage}
              quality={100}
            />
          </div>
          <div className="profile-info">
            <h1 className="name">{user?.displayName}</h1>
            <p className="username">@{user?.username}</p>
            <p className="email">{user?.email}</p>
          </div>
        </section>
        <section>
            <Button onClick={handleSignOut} text={"Sign out"} className={styles.signOut}/>
        </section>
        {/* Add additional sections for user content, such as posts, photos, etc. */}
      </main>
    );
}

export default ProfilePage;