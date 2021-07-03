import { useRouter } from "next/dist/client/router";
import Link, {LinkProps} from "next/link";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps{
  children: ReactElement;
  shouldMacthExactHref?: boolean;
}

export function ActiveLink({children, shouldMacthExactHref = false, ...rest}: ActiveLinkProps){
  const {asPath} =  useRouter()
  let isActive = false;


  if(shouldMacthExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if(!shouldMacthExactHref &&(asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))){ 
    isActive = true;
  }

  return(
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  );
}