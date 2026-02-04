function App() {
  const inlineImages = sessionStorage.getItem('nr_inline_images') !== 'false'

  const toggleInlineImages = () => {
    sessionStorage.setItem('nr_inline_images', inlineImages ? 'false' : 'true')
    window.location.reload()
  }

  return (
    <div className="container">
      <h1>New Relic Session Replay Bug Repro</h1>
      <div className="explanation">
        <p><strong>Bug:</strong> When <code>inline_images: true</code>, the image will flicker on page reload.</p>
        <p>
          On first load, rrweb tries to copy the image to a canvas. Since the canvas becomes tainted
          (cross-origin image), it sets <code>crossorigin="anonymous"</code> on the image and retries.
        </p>
        <p>
          Once the retry fails (server doesn't support CORS), <strong>rrweb never rolls back the
            <code>crossorigin</code> attribute</strong>, causing the image to break/flicker.
        </p>
      </div>
      <div className="controls">
        <button onClick={toggleInlineImages}>
          inline_images: {inlineImages ? 'ON' : 'OFF'} (click to toggle)
        </button>
      </div>
      <div className="image-grid">
        <div className="image-card">
          <h2>WITH CORS</h2>
          <img
            src="https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg"
            alt="With CORS"
          />
        </div>
        <div className="image-card">
          <h2>WITHOUT CORS</h2>
          <img
            src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
            alt="Without CORS"
          />
        </div>
      </div>
    </div>
  )
}

export default App

