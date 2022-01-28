import React, { useEffect, useState } from 'react'
import STLViewer from 'stl-viewer'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'

import { Resources } from '../Resources'

import { MdOutlineAddAPhoto } from 'react-icons/md'
import { AiOutlineRotateRight, AiOutlineRotateLeft } from 'react-icons/ai'

export default function ObjectArea() {
  const [selectedColor, setSelectedColor] = useState('#0a9396')
  const [background, setBackground] = useState('rgb(244,244,245)')
  const [lights, setLights] = useState([900, 900, 900])
  let currentRotate = 0

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

  useEffect(() => {}, [])

  return (
    <div className="w-full flex flex-wrap justify-center content-center p-0 m-0">
      <div className="container mx-auto flex p-5 flex-wrap justify-center  gap-10 content-center">
        <div className="w-full grid grid-cols-2 content-start max-w-[10rem] p-5 gap-5 rounded-xl shadow-xl bg-zinc-100 border h-screen max-h-[28rem]">
          <div className="col-span-2 text-center text-sm text-zinc-400 border-b-2 pb-5">
            Background
          </div>
          {colors.map((color) => (
            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setBackground(color)
                  setLights([0, 0, 0])
                }}
                style={{ backgroundColor: color }}
                className="w-10 border-2 rounded-md h-10 transition-all duration-100 shadow-lg transform hover:scale-105"
              ></button>
            </div>
          ))}
        </div>
        <div className="w-full model-viewer h-screen max-w-md max-h-[28rem] rounded-xl shadow-xl bg-zinc-100 border flex flex-wrap justify-center content-center">
          <STLViewer
            className="w-full h-full"
            model={Resources.WolfSTL}
            backgroundColor={background}
            modelColor={selectedColor}
            lights={lights}
            rotate={true}
            orbitControls={true}
          />
        </div>
        <div className="w-full grid grid-cols-2 content-start max-w-[10rem] p-5 gap-5 rounded-xl shadow-xl bg-zinc-100 border h-screen max-h-[28rem]">
          <div className="col-span-2 text-center text-sm text-zinc-400 border-b-2 pb-5">
            Model
          </div>
          {colors.map((color) => (
            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedColor(color)
                  setLights([0, 0, 0])
                }}
                style={{ backgroundColor: color }}
                className="w-10 border-2 border-stone-400 rounded-md h-10 transition-all duration-100 shadow-lg transform hover:scale-105"
              ></button>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full h-screen max-w-md max-h-[10rem] flex flex-wrap justify-center content-center gap-5 bg-zinc-100 border rounded-xl shadow-xl p-5">
            <button
              type="button"
              onClick={() => {
                const canvas = document.querySelector('.model-viewer canvas')
                currentRotate -= 90
                canvas.style.rotate = currentRotate + 'deg'
              }}
              className="rounded-md border-2 filter active:scale-90 hover:brightness-90 bg-zinc-100 text-stone-600 text-3xl p-3 shadow-lg"
            >
              <AiOutlineRotateLeft />
            </button>
            <button
              type="button"
              onClick={() => {
                var canvas = document.querySelector('.model-viewer canvas')
                html2canvas(canvas, { scale: 1 }).then((cv) => {
                  let exCanvas = document.createElement('canvas')
                  exCanvas.width = cv.width
                  exCanvas.height = cv.height

                  let excontext = exCanvas.getContext('2d')
                  excontext.translate(
                    exCanvas.width * 0.5,
                    exCanvas.height * 0.5
                  )

                  excontext.rotate((currentRotate * Math.PI) / 180)

                  excontext.drawImage(cv, -cv.width * 0.5, -cv.height * 0.5)
                  let image = exCanvas.toDataURL()
                  saveAs(image, 'image.png')
                })
              }}
              className="rounded-md border-2 filter active:scale-90 hover:brightness-90 bg-zinc-100 text-stone-600 text-3xl p-3 shadow-lg"
            >
              <MdOutlineAddAPhoto />
            </button>
            <button
              type="button"
              onClick={() => {
                const canvas = document.querySelector('.model-viewer canvas')
                currentRotate += 90
                canvas.style.rotate = currentRotate + 'deg'
              }}
              className="rounded-md border-2 filter active:scale-90 hover:brightness-90 bg-zinc-100 text-stone-600 text-3xl p-3 shadow-lg"
            >
              <AiOutlineRotateRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
