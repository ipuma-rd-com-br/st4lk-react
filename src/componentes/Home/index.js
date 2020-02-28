import React, {Component} from 'react';
import {MdSearch} from 'react-icons/md';
import {
    Navbar, 
    Input, 
    Button, 
    InputGroup, 
    InputGroupAddon,
    Container,
    Col,
    Row,
    Form,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
    Spinner
} from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Home extends Component {

    state = {
        // seguidores: [],
        carregando: false,
        APOD: []
    }

    hubble = async (event)=> {
        
        event.preventDefault(); // ver o que faz esse evento

        this.setState({carregando: true});
        
        const form = event.target;
        const inputGroup = form.children[0];
        const input = inputGroup.children[0];
        
        console.log(input.value);

        // com desestruturacao
        // const {data: seguidores} = await axios(`https://api.github.com/users/${input.value}/followers`);
        // console.log(seguidores);

        // const seguidores = [];
        // const seguidores = await axios(`https://api.github.com/users/${input.value}/followers`);
        // const seguidores = await axios(`https://api.bitbucket.org/2.0/users/${input.value}`);
        // console.log(seguidores);
        // console.log(seguidores.data);
        // this.setState({ seguidores: seguidores.data, APOD:[] });

        // api.nasa.gov
        // email ivolapuma@gmail.com
        // api key cKpvfq5zyyBf8nwPHPBLciX9nuCgK6junv35oxGg
        const apiKey = 'cKpvfq5zyyBf8nwPHPBLciX9nuCgK6junv35oxGg';
        const dataDaFoto = input.value;
        const APOD = await axios(`https://api.nasa.gov/planetary/apod?date=${dataDaFoto}&api_key=${apiKey}`);
        // catch do axios !!!
        console.log(APOD);
        console.log(APOD.data);
        console.log(APOD.data.url);

        this.setState({
            carregando: false, 
            APOD: [APOD.data, ...this.state.APOD]
        });
    }

    render() {
        return (
            <>
                <Navbar color="dark">
                    <Container className="d-flex justify-content-center">
                        <img 
                            className="text-white rounded-circle border border-white mr-3"
                            width="50" 
                            src="https://www.thispersondoesnotexist.com/image" 
                            alt="Pessoa Aleatória" />
                        <span className="text-white">
                            Logado como 
                            <Link 
                                className="text-white font-weight-bold ml-2"
                                to="/"
                            >
                                {this.props.match.params.usuario}
                            </Link>
                        </span>
                    </Container>
                </Navbar>

                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.hubble}>
                                <InputGroup>
                                    <Input type="date" />
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="light" size="sm" />) : (<MdSearch size="20" />)}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>             
                </Navbar>

                {
                    this.state.carregando ? (
                        <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                            <Spinner color="dark" size="lg" />
                            <span>Carregando...</span>
                        </Container>
                    ) : 
                        this.state.APOD.length > 0 ? (
                            <Container className="mt-3 mb-5">
                                <Row>
                                    {this.state.APOD.map(
                                            (apod)=> {
                                                return (
                                                    <Col className="d-flex" xs="12" md="4">
                                                        <Card className="text-white mb-2" color="dark">
                                                            <CardImg top width="100%" height="30%" src={apod.url} alt={apod.title} />
                                                            <CardBody>
                                                                <CardTitle className="h3 text-center">{apod.title}</CardTitle>
                                                                <CardSubtitle className="text-muted text-center">{apod.copyright} ({apod.date.split('-').reverse().join('/')})</CardSubtitle>
                                                                <CardText className="text-justify">{apod.explanation}</CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                )
                                            }
                                        )}
                                </Row>
                            </Container>
                        ) : (
                            <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                                <span>Digita uma data aí embaixo!</span>
                            </Container>
                        )
                }
            </>
        );
    }
}

export default Home;