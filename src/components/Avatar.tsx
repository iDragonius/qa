import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";

const Avatar: FC = ({}) => {
  const { data: sessionData } = useSession();
  const {t} = useTranslation('common')
  const {locales, locale, asPath} = useRouter()
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <Image
            src={sessionData?.user.image as string}
            alt={"Profile Image"}
            width={40}
            height={40}
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <Link href={`/users/${sessionData?.user.nickname as string}`}>
            {t('user_profile')}
          </Link>
        </li>
        <li>
          <Link
            href={`/users/${sessionData?.user.nickname as string}/questions`}
          >
            {t('user_questions')}
          </Link>
        </li>
        <li>
          <Link href={`/users/${sessionData?.user.nickname as string}/drafts`}>
            {t('user_drafts')}

          </Link>
        </li>
        <li tabIndex={0}>
          <a className="justify-between">
            {t('language')}
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
          </a>
          <ul className="p-2 absolute left-0 bg-base-200 z-[1000] top-10">
            {
              locales?.map(lang=>(
                  <li key={lang} className={'px-10'}>

                    <Link href={asPath} locale={lang} >
                      {lang.toUpperCase()}
                    </Link>
                  </li>

              ))
            }
          </ul>
        </li>
        <li>
          <div onClick={() => signOut()}>{t('logout')}</div>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
