import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Accordion, Button } from 'react-bootstrap';
import { FaRecycle, FaLeaf, FaInfoCircle, FaQuestionCircle, FaVideo } from 'react-icons/fa';

const EducationPage = () => {
  const [key, setKey] = useState('jenis-sampah');

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Edukasi Pemilahan Sampah</h2>
      
      <Tab.Container id="education-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Row className="mb-4">
          <Col md={3} className="mb-3 mb-md-0">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="jenis-sampah" className="d-flex align-items-center">
                  <FaRecycle className="me-2" /> Jenis Sampah
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="cara-memilah" className="d-flex align-items-center">
                  <FaLeaf className="me-2" /> Cara Memilah
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="manfaat" className="d-flex align-items-center">
                  <FaInfoCircle className="me-2" /> Manfaat Pemilahan
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="faq" className="d-flex align-items-center">
                  <FaQuestionCircle className="me-2" /> FAQ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="video" className="d-flex align-items-center">
                  <FaVideo className="me-2" /> Video Edukasi
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="jenis-sampah">
                <Card>
                  <Card.Header className="bg-primary text-white">
                    <h4 className="mb-0">Jenis-Jenis Sampah</h4>
                  </Card.Header>
                  <Card.Body>
                    <p className="lead">
                      Mengenal berbagai jenis sampah adalah langkah awal dalam pemilahan sampah yang efektif.
                    </p>
                    
                    <Row className="mt-4">
                      <Col md={6} className="mb-4">
                        <Card className="h-100 border-primary">
                          <Card.Header className="bg-primary text-white">Sampah Organik</Card.Header>
                          <Card.Body>
                            <p><strong>Definisi:</strong> Sampah yang dapat terurai secara alami.</p>
                            <p><strong>Contoh:</strong></p>
                            <ul>
                              <li>Sisa makanan</li>
                              <li>Daun dan ranting</li>
                              <li>Kulit buah</li>
                              <li>Sayuran busuk</li>
                              <li>Cangkang telur</li>
                            </ul>
                            <p><strong>Penanganan:</strong> Dapat dikomposkan menjadi pupuk organik.</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={6} className="mb-4">
                        <Card className="h-100 border-warning">
                          <Card.Header className="bg-warning text-white">Sampah Anorganik</Card.Header>
                          <Card.Body>
                            <p><strong>Definisi:</strong> Sampah yang sulit atau tidak dapat terurai secara alami.</p>
                            <p><strong>Contoh:</strong></p>
                            <ul>
                              <li>Plastik</li>
                              <li>Kaleng</li>
                              <li>Kaca</li>
                              <li>Logam</li>
                              <li>Styrofoam</li>
                            </ul>
                            <p><strong>Penanganan:</strong> Sebagian besar dapat didaur ulang menjadi produk baru.</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={6} className="mb-4">
                        <Card className="h-100 border-success">
                          <Card.Header className="bg-success text-white">Sampah Kertas</Card.Header>
                          <Card.Body>
                            <p><strong>Definisi:</strong> Sampah berbahan dasar kertas.</p>
                            <p><strong>Contoh:</strong></p>
                            <ul>
                              <li>Koran bekas</li>
                              <li>Kardus</li>
                              <li>Buku dan majalah</li>
                              <li>Kertas HVS</li>
                              <li>Kemasan kertas</li>
                            </ul>
                            <p><strong>Penanganan:</strong> Dapat didaur ulang menjadi kertas baru atau produk berbahan kertas lainnya.</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={6} className="mb-4">
                        <Card className="h-100 border-danger">
                          <Card.Header className="bg-danger text-white">Sampah B3 (Bahan Berbahaya dan Beracun)</Card.Header>
                          <Card.Body>
                            <p><strong>Definisi:</strong> Sampah yang mengandung zat berbahaya dan beracun.</p>
                            <p><strong>Contoh:</strong></p>
                            <ul>
                              <li>Baterai bekas</li>
                              <li>Lampu neon/fluorescent</li>
                              <li>Limbah elektronik</li>
                              <li>Kemasan pestisida</li>
                              <li>Obat-obatan kadaluarsa</li>
                            </ul>
                            <p><strong>Penanganan:</strong> Memerlukan penanganan khusus, tidak boleh dicampur dengan sampah lain.</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              <Tab.Pane eventKey="cara-memilah">
                <Card>
                  <Card.Header className="bg-primary text-white">
                    <h4 className="mb-0">Cara Memilah Sampah</h4>
                  </Card.Header>
                  <Card.Body>
                    <p className="lead">Berikut adalah panduan langkah demi langkah untuk memilah sampah dengan benar:</p>
                    
                    <ol className="mt-4">
                      <li className="mb-3">
                        <strong>Siapkan tempat sampah terpisah</strong>
                        <p>Sediakan minimal 3 tempat sampah berbeda untuk sampah organik, anorganik, dan B3.</p>
                      </li>
                      <li className="mb-3">
                        <strong>Bersihkan sampah sebelum dibuang</strong>
                        <p>Bilas kemasan makanan/minuman untuk menghindari bau dan kontaminasi.</p>
                      </li>
                      <li className="mb-3">
                        <strong>Pisahkan berdasarkan jenisnya</strong>
                        <p>Kelompokkan sampah sesuai kategori (organik, anorganik, kertas, B3).</p>
                      </li>
                      <li className="mb-3">
                        <strong>Kompres sampah jika memungkinkan</strong>
                        <p>Tekan botol plastik atau lipat kardus untuk menghemat ruang.</p>
                      </li>
                      <li className="mb-3">
                        <strong>Kumpulkan secara rutin</strong>
                        <p>Setor sampah yang sudah dipilah ke bank sampah atau fasilitas daur ulang.</p>
                      </li>
                    </ol>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              <Tab.Pane eventKey="manfaat">
                <Card>
                  <Card.Header className="bg-primary text-white">
                    <h4 className="mb-0">Manfaat Pemilahan Sampah</h4>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6} className="mb-4">
                        <Card className="h-100 border-success">
                          <Card.Header className="bg-success text-white">Manfaat Lingkungan</Card.Header>
                          <Card.Body>
                            <ul>
                              <li>Mengurangi volume sampah di TPA</li>
                              <li>Mencegah pencemaran tanah dan air</li>
                              <li>Mengurangi emisi gas rumah kaca</li>
                              <li>Melestarikan sumber daya alam</li>
                              <li>Menciptakan lingkungan yang lebih bersih</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={6} className="mb-4">
                        <Card className="h-100 border-primary">
                          <Card.Header className="bg-primary text-white">Manfaat Ekonomi</Card.Header>
                          <Card.Body>
                            <ul>
                              <li>Mendapatkan nilai ekonomi dari sampah</li>
                              <li>Menciptakan lapangan kerja baru</li>
                              <li>Menghemat biaya pengelolaan sampah</li>
                              <li>Mendorong industri daur ulang</li>
                              <li>Menghasilkan produk baru dari bahan daur ulang</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={6} className="mb-4">
                        <Card className="h-100 border-warning">
                          <Card.Header className="bg-warning text-white">Manfaat Sosial</Card.Header>
                          <Card.Body>
                            <ul>
                              <li>Meningkatkan kesadaran lingkungan</li>
                              <li>Membangun kebiasaan hidup bersih</li>
                              <li>Menciptakan komunitas yang peduli lingkungan</li>
                              <li>Mengurangi risiko penyakit</li>
                              <li>Meningkatkan kualitas hidup masyarakat</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={6} className="mb-4">
                        <Card className="h-100 border-info">
                          <Card.Header className="bg-info text-white">Manfaat Pendidikan</Card.Header>
                          <Card.Body>
                            <ul>
                              <li>Menanamkan nilai kepedulian lingkungan sejak dini</li>
                              <li>Mengajarkan tanggung jawab terhadap lingkungan</li>
                              <li>Meningkatkan pengetahuan tentang daur ulang</li>
                              <li>Mendorong kreativitas dalam pemanfaatan sampah</li>
                              <li>Membangun kesadaran tentang konsumsi berkelanjutan</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              <Tab.Pane eventKey="faq">
                <Card>
                  <Card.Header className="bg-primary text-white">
                    <h4 className="mb-0">Pertanyaan Umum (FAQ)</h4>
                  </Card.Header>
                  <Card.Body>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Mengapa kita perlu memilah sampah?</Accordion.Header>
                        <Accordion.Body>
                          Pemilahan sampah memungkinkan pengelolaan yang lebih efektif untuk setiap jenis sampah. Sampah organik dapat dikomposkan, sampah anorganik dapat didaur ulang, dan sampah B3 dapat ditangani dengan aman. Tanpa pemilahan, semua sampah akan berakhir di tempat pembuangan akhir, menyebabkan pencemaran lingkungan dan pemborosan sumber daya yang masih bisa dimanfaatkan.
                        </Accordion.Body>
                      </Accordion.Item>
                      
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Bagaimana cara memulai pemilahan sampah di rumah?</Accordion.Header>
                        <Accordion.Body>
                          Mulailah dengan menyediakan minimal 2-3 tempat sampah terpisah untuk sampah organik dan anorganik. Edukasi semua anggota keluarga tentang cara memilah. Mulai dari hal sederhana seperti memisahkan sampah basah (sisa makanan) dan sampah kering (plastik, kertas). Seiring waktu, Anda bisa menambah kategori pemilahan yang lebih spesifik.
                        </Accordion.Body>
                      </Accordion.Item>
                      
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Apa yang terjadi jika sampah B3 tercampur dengan sampah lain?</Accordion.Header>
                        <Accordion.Body>
                          Sampah B3 mengandung zat berbahaya yang dapat mencemari tanah dan air jika tidak ditangani dengan benar. Jika tercampur dengan sampah lain, zat berbahaya ini bisa meresap ke dalam tanah di tempat pembuangan dan mencemari air tanah. Selain itu, petugas pengumpul sampah juga berisiko terpapar zat berbahaya tersebut.
                        </Accordion.Body>
                      </Accordion.Item>
                      
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>Bagaimana cara mendapatkan nilai ekonomi dari sampah?</Accordion.Header>
                        <Accordion.Body>
                          Anda dapat menjual sampah yang sudah dipilah ke bank sampah atau pengepul. Sampah anorganik seperti plastik, kertas, logam, dan kaca memiliki nilai jual. Sampah organik dapat diolah menjadi kompos yang bisa digunakan sendiri atau dijual. Beberapa komunitas juga mengolah sampah menjadi kerajinan yang memiliki nilai jual lebih tinggi.
                        </Accordion.Body>
                      </Accordion.Item>
                      
                      <Accordion.Item eventKey="4">
                        <Accordion.Header>Apakah semua jenis plastik bisa didaur ulang?</Accordion.Header>
                        <Accordion.Body>
                          Tidak semua jenis plastik dapat didaur ulang dengan mudah. Plastik memiliki kode 1-7 yang menunjukkan jenisnya. Plastik dengan kode 1 (PET) dan 2 (HDPE) paling mudah didaur ulang dan banyak dicari pengepul. Plastik kode 3 (PVC), 6 (PS), dan 7 (lainnya) lebih sulit didaur ulang. Penting untuk mengetahui jenis plastik yang dapat didaur ulang di daerah Anda.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              <Tab.Pane eventKey="video">
                <Card>
                  <Card.Header className="bg-primary text-white">
                    <h4 className="mb-0">Video Edukasi</h4>
                  </Card.Header>
                  <Card.Body>
                    <p className="lead">Tonton video-video berikut untuk mempelajari lebih lanjut tentang pemilahan sampah:</p>
                    
                    <Row className="mt-4">
                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Header>Cara Memilah Sampah di Rumah</Card.Header>
                          <Card.Body>
                            <div className="ratio ratio-16x9">
                              <iframe 
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                title="Cara Memilah Sampah di Rumah" 
                                allowFullScreen
                              ></iframe>
                            </div>
                            <p className="mt-2">Video tutorial langkah demi langkah untuk memulai pemilahan sampah di rumah.</p>
                            <Button variant="primary" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                              Tonton di YouTube
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Header>Mengenal Jenis-Jenis Sampah</Card.Header>
                          <Card.Body>
                            <div className="ratio ratio-16x9">
                              <iframe 
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                title="Mengenal Jenis-Jenis Sampah" 
                                allowFullScreen
                              ></iframe>
                            </div>
                            <p className="mt-2">Penjelasan detail tentang berbagai jenis sampah dan cara penanganannya.</p>
                            <Button variant="primary" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                              Tonton di YouTube
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default EducationPage;