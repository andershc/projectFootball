'use client'
import React from "react";
import Image from "next/image";
import { useAuthContext } from "../../lib/AuthContext";
import { useRouter } from "next/navigation";
import css from "./profile-page.module.css";
import signOutUser from "../../firebase/auth/signout";
function ProfilePage() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <main>
        <section className={css.profile}>
          <div className="">
            <Image
              src={user?.['photoURL'] || '/hacker.png'}
              alt="Profile Image"
              width={150}
              height={150}
              className={css.profileImage}
              quality={100}
            />
          </div>
          <div className="profile-info">
            <h1 className="name">{user?.displayName}</h1>
            <p className="username">@johndoe</p>
            <p className="email">{user?.email}</p>
          </div>
        </section>
        <section>
            <button onClick={signOutUser}>Sign Out</button>
        </section>
        {/* Add additional sections for user content, such as posts, photos, etc. */}
      </main>
    );
}

export default ProfilePage;