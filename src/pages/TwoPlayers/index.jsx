import React, { useState } from 'react';
import { Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import RadioSelect from '../../components/atoms/RadioSelect';
import NoOfGames from '../../assets/winner.png';
import WhoStarts from '../../assets/run.png';
import Avatar1 from '../../assets/avatar01.png';
import Avatar2 from '../../assets/avatar02.png';
import './index.scss';

const RenderIcon = (image, altText) => {
    return (
        <img src={image} alt={altText} className="button-image" />
    )
}

const TwoPlayers = (props) => {
    const [player1, setPlayer1] = useState('Leela');
    const [player2, setPlayer2] = useState('Preethi');

    const { history: { push } } = props;

    const gameOptions = [{
        name: '3 Games',
        value: 3
    }, {
        name: '5 Games',
        value: 5
    }, {
        name: '7 Games',
        value: 7
    }, {
        name: '10 Games',
        value: 10
    }];

    const gameStartOptions = [{
        name: 'Alternative turn',
        value: 'Alternate'
    }, {
        name: 'Looser first',
        value: 'Looser'
    }, {
        name: 'Winner first',
        value: 'Winner'
    }, {
        name: 'Always player 01',
        value: 'Player1'
    }, {
        name: 'Always player 02',
        value: 'Player2'
    }];

    const [noOfGames, setGames] = useState(gameOptions[0].value);

    const [whoStarts, setWhoStarts] = useState(gameStartOptions[0].value)

    const onGameStart = () => {
        localStorage.setItem('player1', player1);
        localStorage.setItem('player2', player2);
        localStorage.setItem('totalGames', noOfGames);
        localStorage.setItem('whoStarts', whoStarts);
        push('/gamePage');
    }
    return (
        <div className="container">
            <div className="page-container">
                <div className="game-setup-container">
                    <div className="selection-row" style={{ backgroundColor: '#DCF6E4' }}>
                        <Avatar size={{ xs: 40, md: 100, lg: 100, xl: 100, xxl: 100 }} icon={RenderIcon(Avatar1, "Player 1 avatar")} style={{ border: '10px solid #37AC5D' }} />
                        <Input
                            label="Player 01"
                            className="player-text"
                            onChangeHandler={(e) => setPlayer1(e.target.value)}
                            properties={{
                                name: 'Player 01',
                                value: player1,
                                type: 'text',
                                placeholder: 'Enter name for P1'
                            }}
                        />
                    </div>
                    <div className="selection-row" style={{ backgroundColor: '#F6EFD5' }}>
                        <Avatar size={{ xs: 40, md: 100, lg: 100, xl: 100, xxl: 100 }} icon={RenderIcon(Avatar2, "Player 2 avatar")} style={{ border: '10px solid #F8D146' }} />
                        <Input
                            label="Player 02"
                            className="player-text"
                            onChangeHandler={(e) => setPlayer2(e.target.value)}
                            properties={{
                                name: 'Player 02',
                                value: player2,
                                type: 'text',
                                placeholder: 'Enter name for P2'
                            }}
                        />
                    </div>
                    <div className="selection-row" style={{ backgroundColor: '#EFF3FF' }}>
                        <Avatar size={{ xs: 40, md: 100, lg: 100, xl: 100, xxl: 100 }} icon={RenderIcon(NoOfGames, "number of games")} style={{ border: '10px solid #B1C4F9', background: 'transparent' }} />
                        <RadioSelect
                            label="Number of games"
                            className="radio-select-component"
                            selectedValue={noOfGames}
                            onRadioItemChange={(e) => setGames(e)}
                            properties={{
                                name: 'Number of games',
                                value: player2,
                                type: 'text',
                                placeholder: 'Enter name for P2'
                            }}
                            modalTitle="Number of games"
                            checkBoxOptions={gameOptions}
                        />
                    </div>
                    <div className="selection-row" style={{ backgroundColor: '#EFF3FF' }}>
                        <Avatar size={{ xs: 40, md: 100, lg: 100, xl: 100, xxl: 100 }} icon={RenderIcon(WhoStarts, "who starts")} style={{ border: '10px solid #B1C4F9', background: 'transparent' }} />
                        <RadioSelect
                            label="Who starts"
                            className="radio-select-component"
                            selectedValue={whoStarts}
                            onRadioItemChange={(e) => setWhoStarts(e)}
                            properties={{
                                name: 'Who starts',
                                value: player2,
                                type: 'text',
                                placeholder: 'who starts'
                            }}
                            modalTitle="Who starts"
                            checkBoxOptions={gameStartOptions}
                        />
                    </div>
                    <Button
                        text="Start Game"
                        bgColor="#4B7BFF"
                        textColor="#ffffff"
                        onClick={() => onGameStart()}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(TwoPlayers);