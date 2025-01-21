"use client";

import { UserProvider } from "@/modules/user/context/UserContext";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
// import VideoBackground from "@/ui/VideoBackground/VideoBackground";
import ContentContainer from "@/ui/ContentContainer";
import PageWrapper from "@/ui/PageWrapper";

export default function Layout({ children }) {
  return (
    <>
      <PageWrapper>
        <UserProvider>
          <Header />
          <ContentContainer>
            <Navbar />
            {children}
          </ContentContainer>
        </UserProvider>
      </PageWrapper>

      {/* <VideoBackground /> */}
    </>
  );
}
