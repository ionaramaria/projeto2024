import { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { CardWrapper, NavWrapper } from '../../shared';
import { LinkBackToHome } from '../../components';
import { EpisodeResponse, getEpisodes } from '../../services';
import styles from '../Pages.module.css';


//MODO DEV
function TEstemodo(){
  const [episodes, setEpisodes] = useState<EpisodeResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEpisodes(pageNumber);
      setEpisodes(data);
    };
    fetchData();
  }, [pageNumber]);



}



function useEpisodes(pageNumber) {
  const [episodes, setEpisodes] = useState<EpisodeResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEpisodes(pageNumber);
      setEpisodes(data);
    };
    fetchData();
  }, [pageNumber]);

  return episodes;
}


const EpisodeDetailsModal = ({ episode, show, onHide }) => (
  <Modal show={show} onHide={onHide} dialogClassName="modal-90w" aria-labelledby="episode-details-modal-title">
    <Modal.Header closeButton>
      <Modal.Title id="episode-details-modal-title">{episode.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Card.Text><b>Data de Estreia:</b> {episode.air_date}</Card.Text>
      <Card.Text><b>Episódio:</b> {episode.episode}</Card.Text>
      <Card.Text><b>Personagens do episódio:</b></Card.Text>
      {episode.characters.map((character, index) => (
        <Card.Text key={index}><a href={character}>{character}</a></Card.Text>
      ))}
    </Modal.Body>
  </Modal>
);

export function Episodes() {
  const [currentNumber, setCurrentNumber] = useState(1);
  const episodes = useEpisodes(currentNumber);
  const [showModalIndex, setShowModalIndex] = useState<number | null>(null);

  const navigate = (direction: number) => {
    setCurrentNumber((prev) => Math.max(1, prev + direction));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <NavWrapper>
        <LinkBackToHome />
      </NavWrapper>
      <div className={styles.container_cards}>
        {episodes.map((episode, index) => (
          <CardWrapper key={episode.id}>
            <Card.Title>{episode.name}</Card.Title>
            <Card.Text>Data de Estreia: {episode.air_date}</Card.Text>
            <Card.Text>Episódio: {episode.episode}</Card.Text>
            <Button variant="primary" onClick={() => setShowModalIndex(index)}>Show Details</Button>
            <EpisodeDetailsModal
              episode={episode}
              show={showModalIndex === index}
              onHide={() => setShowModalIndex(null)}
            />
          </CardWrapper>
        ))}
      </div>
      <div className={styles.container_buttons_prev_next}>
        <Button onClick={() => navigate(-1)}>Previous</Button>
        <Button onClick={() => navigate(1)}>Next</Button>
      </div>
    </>
  );
}
