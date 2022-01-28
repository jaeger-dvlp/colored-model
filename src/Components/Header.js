import React from 'react'

export default function Header() {
  return (
    <div className="w-full flex flex-wrap justify-center px-5 m-0 py-16">
      <div className="container mx-auto flex justify-center content-center text-center text-zinc-500 font-sans text-2xl">
        <div>
          <b>
            <a href="https://zaxe.com/" target={'_blank'} rel="noreferrer">
              Zaxe{' '}
            </a>
          </b>
          | <small>Colored Models</small>
        </div>
      </div>
    </div>
  )
}
