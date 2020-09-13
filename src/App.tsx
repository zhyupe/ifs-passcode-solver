import React, { useRef, useState, useCallback } from 'react';
import { Container, CircularProgress, Grid, Switch, Typography, Button, Input, Card, CardContent, Link } from '@material-ui/core';
import { portalsToPoints, parseImage, findNearestHash } from './lib/process';
import { getFiles, openReader, readImage } from './lib/file-reader';
import { drawLine } from './lib/canvas-helper';
import { Portal } from './types/portal';
import { saveAs } from 'file-saver'
import './App.css';

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [form, setForm] = useState({
    threshold: 800,
    lineWidth: 5,
    debugging: false,
  });
  const [portals, setPortals] = useState<Portal[]>([])
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)

  const job = useCallback(async () => {
    const canvasElement = canvas.current
    if (!image || !canvasElement) return

    canvasElement.width = image.width
    canvasElement.height = image.height

    const ctx = canvasElement.getContext('2d')
    if (!ctx) return

    ctx.drawImage(image, 0, 0)
    await new Promise((resolve) => setTimeout(resolve, 100))

    const columns = await parseImage(ctx, image.width, image.height, form.threshold, form.debugging)

    for (const column of columns) {
      const hashes = portals.map(({ hash }) => hash)
      const matchedPortals = await Promise.all(column.images.map(async ({ hash }) => {
        const portalIndex = await findNearestHash(hash, hashes as string[])
        return portals[portalIndex]
      }))

      const size = column.right - column.left - 40
      const points = portalsToPoints(
        matchedPortals, 
        size, 
        size, 
        column.left + 20, 
        column.bottom - size - 50
      )

      ctx.lineWidth = form.lineWidth
      ctx.strokeStyle = '#fff'
      drawLine(ctx, points)
    }
  }, [form, image, portals])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    setForm({ ...form, [target.name]: target.type === 'radio' || target.type === 'checkbox' ? target.checked : target.value });
  }

  const fieldStyle = {
    disabled: running,
    style: { width: '100%' }
  }

  const handleDataFileChange = async (input: HTMLInputElement) => {
    for (const file of getFiles(input)) {
      try {
        const content = await openReader(file, 'readAsText')
        setPortals(JSON.parse(content))
        return
      } catch (e) {}
    }
  }

  const handleRunClick = () => {
    if (running) return
    setRunning(true)
    job()
      .then(() => setFinished(true))
      .catch(() => {})
      .then(() => setRunning(false))
  }

  const handleSaveClick = () => {
    const canvasElement = canvas.current
    if (!image || !canvasElement) return

    canvasElement.toBlob((blob) => blob && saveAs(blob))
  }

  return (
    <>
      <Container className="App">
        <h3>IFS Passcode Challenge Solver</h3>
        <Grid container justify="space-between" spacing={3}>
          <Grid item xs>
            <Typography variant="caption" display="block" gutterBottom>
              Data File
            </Typography>
            <input
              accept="application/json"
              style={{ display: 'none' }}
              id="json-file"
              type="file"
              onChange={(e) => handleDataFileChange(e.target)}
            />
            <label htmlFor="json-file">
              <Button variant="contained" component="span" color={portals.length ? 'default' : 'secondary'}>
                Select
              </Button>
            </label>
            {
              portals.length > 0 ? (
                <span style={{ marginLeft: 10 }}>Loaded {portals.length} portal(s)</span>
              ) : null
            }
          </Grid>
          <Grid item xs>
            <Typography variant="caption" display="block" gutterBottom>
              Image
            </Typography>
            <input
              accept="image/jpeg,image/png"
              style={{ display: 'none' }}
              id="image-file"
              type="file"
              onChange={(e) => readImage(e.target).then(img => img && setImage(img))}
            />
            <label htmlFor="image-file">
              <Button variant="contained" component="span" color={image ? 'default' : 'secondary'}>
                Select
              </Button>
            </label>
            {
              image ? (
                <span style={{ marginLeft: 10 }}>Image Loaded</span>
              ) : null
            }
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography variant="caption" display="block" gutterBottom>
              Line Width
            </Typography>
            <Input
              name="lineWidth"
              type="number"
              value={form.lineWidth}
              onChange={handleChange}
              {...fieldStyle}
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography variant="caption" display="block" gutterBottom>
              Threshold
            </Typography>
            <Input
              name="threshold"
              type="number"
              value={form.threshold}
              onChange={handleChange}
              {...fieldStyle}
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography variant="caption" display="block" gutterBottom>
              Debugging
            </Typography>
            <Switch
              checked={form.debugging}
              onChange={handleChange}
              name="debugging"
            />
          </Grid>
        </Grid>
        <Card style={{ marginTop: 10, marginBottom: 10 }}>
          <CardContent>
            Need examples? We have one from Jianggan, Hangzhou:&nbsp;
            <Link href="/demo/jianggan-hangzhou/portals.json" download>Data</Link>,&nbsp;
            <Link href="/demo/jianggan-hangzhou/2020-09.jpg" download>Image</Link>
          </CardContent>
        </Card>
        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            disabled={!portals.length || !image || running}
            onClick={handleRunClick}
            style={{ marginRight: 10 }}
          >
            Run
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={!finished}
            onClick={handleSaveClick}
            style={{ marginRight: 10 }}
          >
            Save
          </Button>
          {
            running ? (
              <CircularProgress size={24} />
            ) : null
          }
        </div>

        <div className="canvas">
          <canvas ref={canvas} />
        </div>
      </Container>
    </>
  );
}

export default App;
