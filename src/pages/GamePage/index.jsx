import React from 'react';
import {Row, Col} from 'antd/lib/grid';
import {withRouter} from 'react-router-dom';
import { Avatar } from 'antd';
import Board from './Board';
import Avatar1 from '../../assets/avatar01.png';
import Avatar2 from '../../assets/avatar02.png';
import Button from '../../components/atoms/Button';
import './index.scss';

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalGames: 0,
            player1: '',
            player2: '',
            currentGame: 1,
            player1Wins: 0,
            player2Wins: 0,
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            isSeriesDraw: false,
            seriesWinner: ''
        }
    }

    componentDidMount() {
        const whoStarts = localStorage.getItem('whoStarts');
        let isXFirst;
        switch (whoStarts) {
            case 'Player2': isXFirst = false; break;
            default: isXFirst = true; break;
        }
        this.setState({
            totalGames: Number(localStorage.getItem('totalGames')),
            player1: localStorage.getItem('player1'),
            player2: localStorage.getItem('player2'),
            xIsNext: isXFirst
        })
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) ? false : true,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1)
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          xIsNext: !this.state.xIsNext,
          stepNumber: history.length,
        }, () => {
            const winner = calculateWinner(squares);
            const {totalGames, player1Wins, player2Wins, player1, player2} = this.state;
            const totalGamesToWin = totalGames %2 === 0 ? (totalGames+1)/2 : totalGames/2;
            if(winner === 'X') {
                if((player1Wins + 1) > totalGamesToWin) {
                    this.setState({
                        seriesWinner: player1
                    })
                }
                this.setState((prevState) => ({
                    player1Wins: prevState.player1Wins + 1
                }));
            }
            if(winner === 'O') {
                if((player2Wins + 1) > totalGamesToWin) {
                    this.setState({
                        seriesWinner: player2
                    })
                }
                this.setState((prevState) => ({
                    player2Wins: prevState.player2Wins + 1
                }));
            }
        });
    }

    RenderIcon = (image, altText) => {
        return (
            <img src={image} alt={altText} className="button-image"/>
        )
    }

    P1Avatar = () => (
        <Avatar size={60} icon={this.RenderIcon(Avatar1, "Player 1 avatar")} style={{border: '10px solid #37AC5D'}} />
    )
    
    P2Avatar = () => (
        <Avatar size={60} icon={this.RenderIcon(Avatar2, "Player 2 avatar")} style={{border: '10px solid #F8D146'}}/>
    )

    endTournament = () => {
        localStorage.clear();
        this.props.history.replace('/');
    }

    clearBoard =(winner) => {
        let xStartsNext;
        const gameSelectionPerson = localStorage.getItem('whoStarts');
        switch(gameSelectionPerson) {
            case 'Player1': xStartsNext = true; break;
            case 'Player2': xStartsNext = false; break;
            case 'Alternate': xStartsNext = this.state.currentGame %2 === 0 ? true : false; break;
            case 'Winner': xStartsNext = winner === 'X' ? true : false; break;
            case 'Looser': xStartsNext = winner === 'X' ? false : true; break;
            default: xStartsNext = true; break;
        }
        this.setState({
            xIsNext: xStartsNext,
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            currentGame: this.state.currentGame + 1
        })
    }

    render() {
        const {totalGames, player1, player2, currentGame, history, xIsNext, stepNumber, player1Wins, player2Wins, seriesWinner} = this.state;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
       
        return (
            <div className="container">
                <div className="game-top-container">
                    <Row className="game-score-container">
                        <Col xs={24} md={18} className="game-container">
                            <div className="game">
                                <div className="board-container">
                                    <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} md={6} className="game-details-container">
                            <div className="game-details">
                                <div className="games-title">
                                    {`${totalGames} Games tournament`}
                                </div>
                                {winner && <div className="congratulations-heading">Congratulations!</div>}
                                <div className="current-game">
                                    {(winner && !seriesWinner) && `${winner === 'X' ? player1: player2}, you won the game`}
                                    {seriesWinner &&  `${player1Wins > player2Wins ? player1 : player2}, You won the tournament`}
                                    {(!winner && !seriesWinner)  && `Playing Game ${currentGame}`}
                                </div>
                            </div>
                            <div className="selection-row" style={{backgroundColor: '#DCF6E4'}}>
                                <div style={xIsNext? {border : '10px solid #FFA200', borderRadius: '100px', padding: '0px'} : {padding: '10px'}}>
                                    {this.P1Avatar()}
                                </div>
                                <div className="player-score-container">
                                    <div>
                                        <div>Player 01</div>
                                        <div>{player1}</div>
                                    </div>
                                    <div>
                                        <div>Score</div>
                                        <div>{player1Wins}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="selection-row" style={{backgroundColor: '#F6EFD5'}}>
                            <div style={ !xIsNext? {border : '10px solid #FFA200', borderRadius: '100px', padding: '0px'} : {padding: '10px'}}>
                                    {this.P2Avatar()}
                                </div>
                                <div className="player-score-container">
                                    <div>
                                        <div>Player 02</div>
                                        <div>{player2}</div>
                                    </div>
                                    <div>
                                        <div>Score</div>
                                        <div>{player2Wins}</div>
                                    </div>
                                </div>
                            </div>
                            {(stepNumber && !winner) ? (
                                <Button
                                    text="Undo Step"
                                    onClick={() => this.jumpTo(stepNumber-1)}
                                    bgColor="#4B7BFF"
                                    textColor="#ffffff"
                                    style={{marginBottom: '10px'}}
                                />
                            ) : null}
                            {(winner  && !seriesWinner) && (
                                <Button
                                    text="Next Game"
                                    onClick={() => this.clearBoard(winner)}
                                    bgColor="#4B7BFF"
                                    textColor="#ffffff"
                                    style={{marginBottom: '10px'}}
                                />
                            )}
                            <Button
                                text="End Tournament"
                                onClick={() => this.endTournament()}
                                textColor="#CC0000"
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default withRouter(GamePage);