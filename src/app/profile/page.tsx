/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import signOutUser from "../../../firebase/auth/signout";
import { useAuthContext, type UserType } from "../../../lib/AuthContext";
import Button from "../../components/button/Button";
import { updateUsername } from "../api/updateData";
import styles from "./profile-page.module.css";
function ProfilePage(): JSX.Element {
  const { user } = useAuthContext();
  const router = useRouter();
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    if (user?.email == null) router.push("/signIn");
  }, [router, user]);

  const handleSignOut = async (): Promise<void> => {
    const { result, error } = await signOutUser();
    if (error !== null) {
      console.log(error);
      return;
    }
    // else successful
    console.log("Result ", result);
    router.push("/signIn");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(event.target.value);
  };

  const handleChangeUsername = async (
    user: UserType,
    username: string
  ): Promise<void> => {
    await updateUsername(user, username)
      .then((r) => {
        if (r !== undefined) {
          console.log("Username updated");
          // update user context
          user.username = username;
          router.push("/profile");
        } else {
          console.log("Username not updated");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <section className={styles.profile}>
        <div className="">
          <Image
            src={
              user?.photoURL !== null && user?.photoURL !== undefined
                ? user?.photoURL
                : "/static/images/hacker.png"
            }
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
          <p>Total points: {user?.points}</p>
        </div>
      </section>

      {user != null && (
        <section className={styles.usernameContainer}>
          <input
            type="text"
            placeholder="Enter a username..."
            className={styles.usernameInput}
            value={username}
            onChange={handleInputChange}
          />
          <Button
            onClick={async () => {
              await handleChangeUsername(user, username);
            }}
            text={"Update username"}
            className={styles.updateUsername}
          />
        </section>
      )}
      <section>
        <Button
          onClick={handleSignOut}
          text={"Sign out"}
          className={styles.signOut}
        />
      </section>
      {/* Add additional sections for user content, such as posts, photos, etc. */}
    </main>
  );
}

export default ProfilePage;
