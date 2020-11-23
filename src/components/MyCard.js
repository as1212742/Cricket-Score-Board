import React, { useState, Fragment, useEffect } from 'react'
import { getScore } from '../api/Api'
import { Modal } from 'react-bootstrap'
import {
  Card,
  CardContent,
  Button,
  Typography,
  CardActions,
  Grid,
} from '@material-ui/core'

const MyCard = ({ match }) => {
  useEffect(() => {
    let clr = match.matchStarted === true ? 'white' : 'grey'
    setClr(clr)
  }, [])

  //console.log(match)
  const [clr, setClr] = useState('white')
  const [score, setScore] = useState({})
  const [modalShow, setModalShow] = React.useState(false)

  // console.log(score)
  const fetchScore = (unique_id) => {
    console.log(unique_id)
    getScore(unique_id)
      .then((data) => setScore(data), handleOpen())
      .catch((err) => console.log(err))
  }

  const handleOpen = () => {
    setModalShow(true)
  }
  const handleClose = () => {
    setModalShow(false)
  }

  //card popup body
  const showCard = () => {
    console.log(score)
    return (
      score && (
        <Modal
          show={modalShow}
          onHide={handleClose}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              Score Board
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ justifyContent: 'space-evenly' }}>
            <div
              className='border border-info'
              style={{ padding: '3px', color: '#f57c00' }}
            >
              Team:{' '}
              <strong style={{ color: '#00897b' }}>{score.description}</strong>{' '}
            </div>
            <div
              className='border border-info'
              style={{ padding: '3px', margin: '1px auto', color: '#f57c00' }}
            >
              Status: <strong style={{ color: '#00897b' }}>{score.stat}</strong>
            </div>
            <div
              className='border border-info'
              style={{ padding: '3px', margin: '1px auto', color: '#f57c00' }}
            >
              Match Status:{' '}
              {score.matchStarted ? (
                <strong style={{ color: '#00897b' }}>Started</strong>
              ) : (
                <strong>not started</strong>
              )}
            </div>
            <div
              className='border border-info'
              style={{ padding: '3px', color: '#f57c00' }}
            >
              Score: <strong style={{ color: '#00897b' }}>{score.score}</strong>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} variant='contained' color='primary'>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )
    )
  }

  const getMatchCart = () => {
    return (
      <Card style={{ margin: '10px', padding: '10px', backgroundColor: clr }}>
        <CardContent>
          <h1>{match.matchStarted ? null : 'Not Yet Started'}</h1>
          <Grid container justify='space-evenly'>
            <Grid item>
              <Typography style={{ margin: '30px', fontWeight: '1000' }}>
                {match['team-1']}
              </Typography>
            </Grid>
            <Grid item>
              <img
                style={{ width: 85 }}
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT6d50LO-FFqmRBUWMD-Exo1Oh-Xhba30xGmuNVzfuTL_hXdgWa3V20kfSbQ0aZY2iQmIyMdoPmtBqLhQEmeSxa8mzYOZCcTsywLIyXcKU&usqp=CAU&ec=45725304'
                }
                alt=''
              />
            </Grid>
            <Grid item>
              <Typography style={{ margin: '30px', fontWeight: '1000' }}>
                {match['team-2']}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify='space-evenly'>
            {match.matchStarted && (
              <Button
                variant='contained'
                color='primary'
                onClick={() => fetchScore(match.unique_id)}
              >
                Show Score
              </Button>
            )}

            <Button variant='contained' color='primary'>
            {
              match.matchStarted ? `started`: `Start Time
              ${new Date(match.dateTimeGMT).toLocaleString()}`
            }
            </Button>
          </Grid>
        </CardActions>
      </Card>
    )
  }

  return (
    <Fragment>
      {getMatchCart()} {showCard()}
    </Fragment>
  )
}

export default MyCard
