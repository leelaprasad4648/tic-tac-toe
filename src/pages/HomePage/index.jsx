import React from 'react';
import {Row, Col} from 'antd/lib/grid';
import {withRouter} from 'react-router-dom';
import Button from '../../components/atoms/Button';
import One from '../../assets/one.png';
import Two from '../../assets/two.png';
import Training from '../../assets/training.png';
import Online from '../../assets/online.png';
import './index.scss'

const RenderIcon = (image, altText) => {
    return (
        <img src={image} alt={altText} className="button-image"/>
    )
}

const HomePage = (props) => {
    const {history} = props;
    return (
        <div className="container">
            <div className="page-container">
                <div className="heading-container">
                    <div className="title">
                        Connect Four!
                    </div>
                    <div className="sub-title">
                        Play with other players around the world.
                    </div>
                </div>
                <div className="card-container-with-footer">
                    <div className="home-page-content">
                        <Row gutter={30} className="game-play-options-row">
                            <Col xs={24} md={12} >
                                <Button
                                    text="Custom Game"
                                    icon={RenderIcon(One, "one player")}
                                    bgColor="#4BABFF"
                                    disabled
                                />
                            </Col>
                            <Col xs={24} md={12} >
                                <Button
                                    text="Two Players"
                                    onClick={() => history.push('/twoPlayers')}
                                    icon={RenderIcon(Two, "Two players")}
                                    bgColor="#4B7BFF"
                                />
                            </Col>
                        </Row>
                        <Row gutter={30} className="game-play-options-row">
                        <Col xs={24} md={12}>
                                <Button
                                    text="Game Online"
                                    icon={RenderIcon(Online, "online gameplay")}
                                    bgColor="#4B4BFF"
                                    disabled
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <Button
                                    text="Training Game"
                                    icon={RenderIcon(Training, "Training")}
                                    bgColor="#6E4BFF"
                                    disabled
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="footer">
                        &copy; 2020
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(HomePage);