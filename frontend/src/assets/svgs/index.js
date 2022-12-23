export function Gol({ width, color }) {
    return (<svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="futbol"
        role="img"
        viewBox="0 0 512 512"
        width={width}

    >
        <path
            fill={color}
            d="M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM416.6 360.9l-85.4-1.297l-25.15 81.59C290.1 445.5 273.4 448 256 448s-34.09-2.523-50.09-6.859L180.8 359.6l-85.4 1.297c-18.12-27.66-29.15-60.27-30.88-95.31L134.3 216.4L106.6 135.6c21.16-26.21 49.09-46.61 81.06-58.84L256 128l68.29-51.22c31.98 12.23 59.9 32.64 81.06 58.84L377.7 216.4l69.78 49.1C445.8 300.6 434.8 333.2 416.6 360.9z"
            class=""
        ></path>
    </svg>)
}
export function Substituicao({ width, color }) {
    return (<svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="up-long"
        role="img"
        viewBox="0 0 320 512"
        width={width}
    >
        <path
            fill={color}
            d="M285.1 145.7c-3.81 8.758-12.45 14.42-21.1 14.42L192 160.1V480c0 17.69-14.33 32-32 32s-32-14.31-32-32V160.1L55.1 160.1c-9.547 0-18.19-5.658-22-14.42c-3.811-8.758-2.076-18.95 4.408-25.94l104-112.1c9.498-10.24 25.69-10.24 35.19 0l104 112.1C288.1 126.7 289.8 136.9 285.1 145.7z"
            class=""
        ></path>
    </svg>)
}
export function Cartao({ width, color }) {
    return (
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" role="img" viewBox="0 0 384 512"
            width={width}
        >
            <path fill={color} d="M384 128v255.1c0 35.35-28.65 64-64 64H64c-35.35 0-64-28.65-64-64V128c0-35.35 28.65-64 64-64H320C355.3 64 384 92.65 384 128z">
            </path>
        </svg>
    )
}

export function CantoIcon({ width, color }) {
    return (<svg aria-hidden="true" width={width} focusable="false" data-prefix="fas" data-icon="flag" role="img" viewBox="0 0 512 512" class="svg-inline--fa fa-flag"><path fill="gray" d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z" class=""></path></svg>)
}
export function Reply({ width, color }) {
    return (<svg aria-hidden="true" width={width} focusable="false" data-prefix="fas" data-icon="share" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-share"><path fill={color} d="M503.7 226.2l-176 151.1c-15.38 13.3-39.69 2.545-39.69-18.16V272.1C132.9 274.3 66.06 312.8 111.4 457.8c5.031 16.09-14.41 28.56-28.06 18.62C39.59 444.6 0 383.8 0 322.3c0-152.2 127.4-184.4 288-186.3V56.02c0-20.67 24.28-31.46 39.69-18.16l176 151.1C514.8 199.4 514.8 216.6 503.7 226.2z" class=""></path></svg>)
}
export function Lencois({ width, color }) {
    return (<svg aria-hidden="true" width={width} focusable="false" data-prefix="far" data-icon="hand" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-hand"><path fill={color} d="M408 80c-3.994 0-7.91 .3262-11.73 .9551c-9.586-28.51-36.57-49.11-68.27-49.11c-6.457 0-12.72 .8555-18.68 2.457C296.6 13.73 273.9 0 248 0C222.1 0 199.3 13.79 186.6 34.44C180.7 32.85 174.5 32 168.1 32C128.4 32 96.01 64.3 96.01 104v121.6C90.77 224.6 85.41 224 80.01 224c-.0026 0 .0026 0 0 0C36.43 224 0 259.2 0 304.1c0 20.29 7.558 39.52 21.46 54.45l81.25 87.24C141.9 487.9 197.4 512 254.9 512h33.08C393.9 512 480 425.9 480 320V152C480 112.3 447.7 80 408 80zM432 320c0 79.41-64.59 144-143.1 144H254.9c-44.41 0-86.83-18.46-117.1-50.96l-79.76-85.63c-6.202-6.659-9.406-15.4-9.406-23.1c0-22.16 18.53-31.4 31.35-31.4c8.56 0 17.1 3.416 23.42 10.18l26.72 28.69C131.8 312.7 133.9 313.4 135.9 313.4c4.106 0 8.064-3.172 8.064-8.016V104c0-13.25 10.75-24 23.1-24c13.25 0 23.1 10.75 23.1 24v152C192 264.8 199.2 272 208 272s15.1-7.163 15.1-15.1L224 72c0-13.25 10.75-24 23.1-24c13.25 0 23.1 10.75 23.1 24v184C272 264.8 279.2 272 288 272s15.99-7.164 15.99-15.1l.0077-152.2c0-13.25 10.75-24 23.1-24c13.25 0 23.1 10.75 23.1 24v152.2C352 264.8 359.2 272 368 272s15.1-7.163 15.1-15.1V152c0-13.25 10.75-24 23.1-24c13.25 0 23.1 10.75 23.1 24V320z" class=""></path></svg>)
}
export function Stop({ width, color }) {
    return (<svg aria-hidden="true" width={width} focusable="false" data-prefix="far" data-icon="hand" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-hand"><path fill={color} d="M408 80c-3.994 0-7.91 .3262-11.73 .9551c-9.586-28.51-36.57-49.11-68.27-49.11c-6.457 0-12.72 .8555-18.68 2.457C296.6 13.73 273.9 0 248 0C222.1 0 199.3 13.79 186.6 34.44C180.7 32.85 174.5 32 168.1 32C128.4 32 96.01 64.3 96.01 104v121.6C90.77 224.6 85.41 224 80.01 224c-.0026 0 .0026 0 0 0C36.43 224 0 259.2 0 304.1c0 20.29 7.558 39.52 21.46 54.45l81.25 87.24C141.9 487.9 197.4 512 254.9 512h33.08C393.9 512 480 425.9 480 320V152C480 112.3 447.7 80 408 80zM432 320c0 79.41-64.59 144-143.1 144H254.9c-44.41 0-86.83-18.46-117.1-50.96l-79.76-85.63c-6.202-6.659-9.406-15.4-9.406-23.1c0-22.16 18.53-31.4 31.35-31.4c8.56 0 17.1 3.416 23.42 10.18l26.72 28.69C131.8 312.7 133.9 313.4 135.9 313.4c4.106 0 8.064-3.172 8.064-8.016V104c0-13.25 10.75-24 23.1-24c13.25 0 23.1 10.75 23.1 24v152C192 264.8 199.2 272 208 272s15.1-7.163 15.1-15.1L224 72c0-13.25 10.75-24 23.1-24c13.25 0 23.1 10.75 23.1 24v184C272 264.8 279.2 272 288 272s15.99-7.164 15.99-15.1l.0077-152.2c0-13.25 10.75-24 23.1-24c13.25 0 23.1 10.75 23.1 24v152.2C352 264.8 359.2 272 368 272s15.1-7.163 15.1-15.1V152c0-13.25 10.75-24 23.1-24c13.25 0 23.1 10.75 23.1 24V320z" class=""></path></svg>)
}
export function Match({ width, color }) {
    return (
        <svg aria-hidden="true" focusable="false" width={width} data-prefix="fas" data-icon="clock" role="img" viewBox="0 0 512 512" class="svg-inline--fa fa-clock"><path fill={color} d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z" class=""></path></svg>
    )
}
export function League({ width, color }) {
    return (
        <svg aria-hidden="true" focusable="false" data-prefix="fas" width={width} data-icon="trophy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-trophy"><path fill={color} d="M572.1 82.38C569.5 71.59 559.8 64 548.7 64h-100.8c.2422-12.45 .1078-23.7-.1559-33.02C447.3 13.63 433.2 0 415.8 0H160.2C142.8 0 128.7 13.63 128.2 30.98C127.1 40.3 127.8 51.55 128.1 64H27.26C16.16 64 6.537 71.59 3.912 82.38C3.1 85.78-15.71 167.2 37.07 245.9c37.44 55.82 100.6 95.03 187.5 117.4c18.7 4.805 31.41 22.06 31.41 41.37C256 428.5 236.5 448 212.6 448H208c-26.51 0-47.99 21.49-47.99 48c0 8.836 7.163 16 15.1 16h223.1c8.836 0 15.1-7.164 15.1-16c0-26.51-21.48-48-47.99-48h-4.644c-23.86 0-43.36-19.5-43.36-43.35c0-19.31 12.71-36.57 31.41-41.37c86.96-22.34 150.1-61.55 187.5-117.4C591.7 167.2 572.9 85.78 572.1 82.38zM77.41 219.8C49.47 178.6 47.01 135.7 48.38 112h80.39c5.359 59.62 20.35 131.1 57.67 189.1C137.4 281.6 100.9 254.4 77.41 219.8zM498.6 219.8c-23.44 34.6-59.94 61.75-109 81.22C426.9 243.1 441.9 171.6 447.2 112h80.39C528.1 135.7 526.5 178.7 498.6 219.8z" class=""></path></svg>
    )
}

export function Favorite({ width, color }) {
    return (
        <svg aria-hidden="true" focusable="false" width={width} data-prefix="fas" data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-bell"><path fill={color} d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" class=""></path></svg>
    )
}

export function Campo({ }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="white"
            version="1.1"
            viewBox="0 0 1150 720"
        >
            <rect y="0" x="0"
                fill="green"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m575 20h-525v680h1050v-680h-525v680z"
                fill="green"
            />
            <circle
                r="91.5"
                fill-opacity="0"
                stroke="white"
                cy="360"
                cx="575"
                stroke-width="2"
            />
            <circle cy="360" cx="575" r="2" stroke="white" fill="white" />
            <circle cy="360" cx="160" r="2" stroke="white" fill="white" />
            <circle cy="360" cx="990" r="2" stroke="white" fill="white" />
            <path
                stroke="white"
                stroke-width="2"
                d="m50 324.4h-10v72.2h10z"
                fill-opacity="0"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m1100 324.4h10v72.2h-10z"
                fill-opacity="0"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m50 269.4h55v182.2h-55z"
                fill-opacity="0"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m1100 269.4h-55v182.2h55z"
                fill-opacity="0"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m50 159.4h165v402.2h-165z"
                fill-opacity="0"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m1100 159.4h-165v402.2h165z"
                fill-opacity="0"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m215 286.88a91.5 91.5 0 0 1 0 146.24z"
                fill="green"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m935 286.88a91.5 91.5 0 0 0 0 146.24z"
                fill="green"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m50 30a10 10 0 0 0 10 -10h-10z"
                fill-opacity="0"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m60 700a10 10 0 0 0 -10 -10v10z"
                fill-opacity="0"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m1100 690a10 10 0 0 0 -10 10h10z"
                fill-opacity="0"
            />
            <path
                stroke="white"
                stroke-width="2"
                d="m1090 20a10 10 0 0 0 10 10v-10z"
                fill-opacity="0"
            />
        </svg>
    )
}
export function Player({ width, color }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" height={100} viewBox="0 0 1280.000000 640.000000" preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
                <path d="M2466 6121 l-100 -169 -80 -24 c-146 -45 -577 -175 -756 -228 -379 -112 -711 -228 -1012 -354 -184 -76 -506 -225 -513 -237 -7 -10 47 -268 92 -444 93 -365 211 -611 381 -795 l60 -65 113 57 c249 125 405 167 717 193 l82 7 0 -1874 0 -1874 138 -32 c498 -113 905 -156 1472 -156 576 0 1056 46 1668 161 l142 27 0 1874 0 1874 23 -6 c12 -4 119 -22 237 -41 226 -36 290 -50 381 -84 62 -23 155 -77 211 -122 20 -16 41 -29 46 -29 13 0 100 94 151 163 126 172 206 388 300 812 22 99 47 206 56 238 8 32 15 64 15 72 0 18 -153 108 -360 211 -332 165 -523 236 -1100 404 -439 128 -554 165 -759 243 l-133 50 -105 158 c-90 134 -109 158 -127 154 -82 -19 -352 -36 -561 -36 -208 0 -481 18 -560 37 -17 4 -36 -22 -119 -165z" />
            </g>
        </svg>
    )
}