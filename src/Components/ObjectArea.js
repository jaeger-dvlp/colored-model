/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import STLViewer from 'stl-viewer'

import { Resources } from '../Resources'

import { AiFillFolderAdd } from 'react-icons/ai'
import { BsCheckCircle, BsExclamationCircle } from 'react-icons/bs'

export default function ObjectArea() {
  const fileSelector = useRef()
  const [lights, setLights] = useState([900, 900, 900])
  const [model, setModel] = useState(Resources.adaptifUrun)
  const [modelName, setModelName] = useState('Upload your model')
  const [popUp, setPopup] = useState({ status: false, text: 'null' })

  const [selectedColors, setSelectedColors] = useState({
    modelColor: '#0a9396',
    backgroundColor: 'rgb(244,244,245)'
  })

  const colors = [
    '#001219',
    '#005f73',
    '#0a9396',
    '#94d2bd',
    '#e9d8a6',
    '#ee9b00',
    '#ca6702',
    '#bb3e03',
    '#ae2012',
    '#9b2226'
  ]

  useEffect(() => {
    fileSelector.current.addEventListener('change', (e) => {
      if (e.target.files[0].name.includes('.stl')) {
        setLights([0, 0, 0])
        setModel(URL.createObjectURL(e.target.files[0]))
        setPopup((prev) => ({
          status: true,
          icon: 'check',
          text: 'Model is updated!'
        }))
        setModelName(fileSelector.current.files[0].name)
      } else {
        setPopup({
          status: true,
          icon: 'error',
          text: 'File must be stl.'
        })
      }
    })
  }, [])

  useEffect(() => {
    if (popUp.status !== false) {
      setTimeout(() => {
        setPopup((prev) => ({
          status: false,
          icon: prev.icon,
          text: prev.text
        }))
      }, 1500)
    }
  }, [popUp])

  useEffect(() => {
    return () => {
      if (popUp.status !== true) {
        setPopup((prev) => ({
          status: true,
          icon: 'check',
          text: 'Color is updated!'
        }))
      }
    }
  }, [selectedColors])

  return (
    <div className="w-full relative font-pop flex flex-wrap justify-center content-center p-0 m-0">
      <div className="container relative mx-auto flex p-5 flex-wrap justify-center  gap-10 content-center">
        <div
          className={`${
            popUp.status === false
              ? '-translate-y-14 opacity-0 invisible'
              : '-translate-y-0 opacity-100 visible'
          } fixed z-50 left-1/2 transform transition-all duration-150 -translate-x-1/2 gap-3 shadow-xl top-12 rounded-md bg-zinc-100 p-3 flex content-center min-h-[3rem] max-w-[17rem] min-w-[15rem] border`}
        >
          <div className="max-w-[2rem] flex justify-center content-center self-center w-full min-h-[2rem] ">
            {popUp.icon === 'check' ? (
              <BsCheckCircle className="self-center p-1 bg-green-500 rounded-full bg-opacity-20 text-2xl text-green-600" />
            ) : popUp.icon === 'error' ? (
              <BsExclamationCircle className="self-center p-1 bg-red-400 rounded-full bg-opacity-20 text-2xl text-red-500" />
            ) : (
              ''
            )}
          </div>
          <div className="w-full text-zinc-600 self-center flex flex-wrap justify-start text-start content-center">
            {popUp.text}
          </div>
        </div>
        <div className="w-full grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-6 content-start xl:max-w-[10rem] lg:max-w-[10rem] max-w-md p-5 gap-5 rounded-xl shadow-xl bg-zinc-100 border xl:h-screen lg:h-screen xl:max-h-[28rem] lg:max-h-[28rem] ">
          <div className="col-span-full text-center text-sm text-zinc-400 border-b-2 pb-5">
            Background
          </div>
          {colors.map((color) => (
            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedColors((prev) => ({
                    modelColor: prev.modelColor,
                    backgroundColor: color
                  }))
                  setLights([0, 0, 0])
                }}
                style={{ backgroundColor: color }}
                className="w-10 border-2 rounded-md h-10 transition-all duration-100 shadow-lg transform hover:scale-105"
              ></button>
            </div>
          ))}
        </div>
        <div className="w-full relative model-viewer h-screen max-w-md max-h-[28rem] rounded-xl shadow-xl bg-zinc-100 border flex flex-wrap justify-center content-center">
          <div className="absolute py-1 px-1 left-1/2 -translate-x-1/2 text-zinc-400 text-xs  top-0 ">
            {modelName}
          </div>
          <STLViewer
            className="w-full h-full rounded-md border"
            model={model}
            backgroundColor={selectedColors.backgroundColor}
            modelColor={selectedColors.modelColor}
            lights={lights}
            rotate={true}
            orbitControls={true}
          />
        </div>
        <div className="w-full grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-6 content-start xl:max-w-[10rem] lg:max-w-[10rem] max-w-md p-5 gap-5 rounded-xl shadow-xl bg-zinc-100 border xl:h-screen lg:h-screen xl:max-h-[28rem] lg:max-h-[28rem] ">
          <div className="col-span-full text-center text-sm text-zinc-400 border-b-2 pb-5">
            Model
          </div>
          {colors.map((color) => (
            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedColors((prev) => ({
                    modelColor: color,
                    backgroundColor: prev.backgroundColor
                  }))
                  setLights([0, 0, 0])
                }}
                style={{ backgroundColor: color }}
                className="w-10 border-2 rounded-md h-10 transition-all duration-100 shadow-lg transform hover:scale-105"
              ></button>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md  flex flex-wrap justify-start gap-3  rounded-xl  p-0">
            <button
              type="button"
              onClick={() => {
                fileSelector.current.click()
              }}
              className="rounded-md border-2 content-center filter active:scale-90 hover:brightness-90 bg-zinc-100 text-stone-600 text-3xl p-3 shadow-lg"
            >
              <AiFillFolderAdd />
            </button>
            <div className="self-center text-zinc-400 font-medium">
              Upload Your 3D Model.
            </div>
          </div>
        </div>
        <input
          ref={fileSelector}
          className="hidden"
          type="file"
          accept=".stl"
        />
      </div>
    </div>
  )
}
