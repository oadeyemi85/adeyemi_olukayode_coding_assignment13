import React, { useState } from 'react';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Dropdown from './components/Dropdown/Dropdown';
import HeroImage from './components/HeroImage/HeroImage';
import Img from './components/Img/Img';
import Label from './components/Label/Label';
import RadioButton from './components/RadioButton/RadioButton';
import Table from './components/Table/Table';
import TableCell from './components/TableCell/TableCell';
import TableFooter from './components/TableFooter/TableFooter';
import TableHeader from './components/TableHeader/TableHeader';
import TableRow from './components/TableRow/TableRow';
import Text from './components/Text/Text';
import './App.css';

const navigation = [
  { label: 'Overview', href: '#overview', number: '01' },
  { label: 'Actions', href: '#actions', number: '02' },
  { label: 'Content', href: '#content', number: '03' },
  { label: 'Form controls', href: '#forms', number: '04' },
  { label: 'Data display', href: '#data', number: '05' },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All components');
  const [selectedPlan, setSelectedPlan] = useState('growth');
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="UI Garden home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="brand-name">ui garden</span>
        </a>

        <div className="sidebar-label">LIBRARY</div>
        <nav className="side-navigation" aria-label="Page sections">
          {navigation.map((item, index) => (
            <a
              className={index === 0 ? 'nav-link nav-link-active' : 'nav-link'}
              href={item.href}
              key={item.href}
            >
              <span className="nav-number">{item.number}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className="status-dot" aria-hidden="true" />
          <span>13 components ready</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            UI Garden <span>/</span> Component library
          </div>
          <span className="version-pill">VERSION 1.0</span>
        </header>

        <div className="page-content">
          <section className="intro-section" id="overview">
            <div className="eyebrow">
              <span /> YOUR COMPONENT TOOLKIT
            </div>
            <h1>
              Small pieces.
              <br />
              <span>Better interfaces.</span>
            </h1>
            <p className="intro-copy">
              A growing collection of reusable React components, ready to make something great.
              Explore the building blocks below.
            </p>
            <div className="intro-meta">
              <span>
                <strong>13</strong> components
              </span>
              <i aria-hidden="true" />
              <span>
                <strong>React</strong> + TypeScript
              </span>
              <i aria-hidden="true" />
              <span>
                <strong>Accessible</strong> by default
              </span>
            </div>
            <div className="intro-art" aria-hidden="true">
              <div className="art-circle art-circle-one" />
              <div className="art-circle art-circle-two" />
              <div className="art-circle art-circle-three" />
              <span className="art-spark art-spark-one">✳</span>
              <span className="art-spark art-spark-two">✳</span>
              <span className="art-label">
                make it
                <br />
                bloom
              </span>
            </div>
          </section>

          <section className="library-section" id="actions">
            <div className="section-heading">
              <div>
                <span className="section-kicker">01 — INTERACTION</span>
                <h2>Actions &amp; controls</h2>
              </div>
              <span className="component-count">3 components</span>
            </div>
            <div className="specimen-grid two-columns">
              <article className="specimen-card">
                <div className="specimen-heading">
                  <div>
                    <h3>Button</h3>
                    <p>Clear, confident calls to action.</p>
                  </div>
                  <span className="component-tag">BUTTON</span>
                </div>
                <div className="specimen-body button-examples">
                  <Button
                    text="Primary action"
                    backgroundColor="#2d735e"
                    onClick={() => setClickCount((count) => count + 1)}
                  />
                  <Button text="Secondary" backgroundColor="#536b61" />
                  <Button text="Disabled" disabled />
                </div>
                <div className="specimen-note">
                  {clickCount > 0
                    ? `Primary action clicked ${clickCount} ${clickCount === 1 ? 'time' : 'times'}.`
                    : 'Try the primary action to see it respond.'}
                </div>
              </article>

              <article className="specimen-card" id="forms">
                <div className="specimen-heading">
                  <div>
                    <h3>Dropdown &amp; radio</h3>
                    <p>Simple choices, made easy.</p>
                  </div>
                  <span className="component-tag">INPUT</span>
                </div>
                <div className="specimen-body form-examples">
                  <div className="form-field">
                    <Label text="Browse by category" htmlFor="category-select" />
                    <Dropdown
                      options={[
                        { label: 'All components', value: 'All components' },
                        { label: 'Actions', value: 'Actions' },
                        { label: 'Content', value: 'Content' },
                        { label: 'Data display', value: 'Data display' },
                      ]}
                      value={selectedCategory}
                      placeholder="Choose a category"
                      onChange={(event) => setSelectedCategory(event.target.value)}
                      aria-label="Browse by category"
                    />
                  </div>
                  <div className="radio-options" role="group" aria-label="Choose a plan">
                    <RadioButton
                      name="plan"
                      value="starter"
                      label="Starter"
                      checked={selectedPlan === 'starter'}
                      onChange={(event) => setSelectedPlan(event.target.value)}
                    />
                    <RadioButton
                      name="plan"
                      value="growth"
                      label="Growth"
                      checked={selectedPlan === 'growth'}
                      onChange={(event) => setSelectedPlan(event.target.value)}
                    />
                    <RadioButton
                      name="plan"
                      value="scale"
                      label="Scale"
                      checked={selectedPlan === 'scale'}
                      onChange={(event) => setSelectedPlan(event.target.value)}
                    />
                  </div>
                </div>
                <div className="specimen-note">
                  Showing: {selectedCategory} <span>·</span> Plan: {selectedPlan}
                </div>
              </article>
            </div>
          </section>

          <section className="library-section" id="content">
            <div className="section-heading">
              <div>
                <span className="section-kicker">02 — CONTENT</span>
                <h2>Content &amp; imagery</h2>
              </div>
              <span className="component-count">5 components</span>
            </div>
            <div className="specimen-grid two-columns">
              <article className="specimen-card">
                <div className="specimen-heading">
                  <div>
                    <h3>Text &amp; label</h3>
                    <p>Style the details that tell your story.</p>
                  </div>
                  <span className="component-tag">TYPE</span>
                </div>
                <div className="specimen-body typography-examples">
                  <Label text="JUST ADDED" backgroundColor="#e3f1e9" color="#2d735e" />
                  <Text size="22px" color="#243a32">
                    Thoughtful by design.
                  </Text>
                  <Text color="#687770">
                    Flexible text and label components help bring clarity and hierarchy to every
                    screen.
                  </Text>
                  <Label text="Disabled label" disabled />
                </div>
              </article>

              <article className="specimen-card">
                <div className="specimen-heading">
                  <div>
                    <h3>Card</h3>
                    <p>A tidy home for related content.</p>
                  </div>
                  <span className="component-tag">LAYOUT</span>
                </div>
                <div className="specimen-body card-example">
                  <Card
                    title="A little room to grow"
                    content="Bring related content together in one clear, reusable card."
                    backgroundColor="#fbfaf6"
                  >
                    <span className="card-link">
                      Explore the collection <span aria-hidden="true">↗</span>
                    </span>
                  </Card>
                </div>
              </article>

              <article className="specimen-card">
                <div className="specimen-heading">
                  <div>
                    <h3>Hero image</h3>
                    <p>A welcoming first impression.</p>
                  </div>
                  <span className="component-tag">IMAGE</span>
                </div>
                <div className="specimen-body hero-example">
                  <HeroImage
                    src="/logo512.png"
                    title="Grow something good."
                    subtitle="A little inspiration goes a long way."
                    height="210px"
                    backgroundColor="#315e50"
                  />
                </div>
              </article>

              <article className="specimen-card">
                <div className="specimen-heading">
                  <div>
                    <h3>Image</h3>
                    <p>Drop an image into any layout.</p>
                  </div>
                  <span className="component-tag">IMAGE</span>
                </div>
                <div className="specimen-body image-example">
                  <Img src="/logo192.png" alt="React logo component example" width="110px" />
                  <div>
                    <strong>Local assets, too.</strong>
                    <p>Responsive images with a clean, consistent frame.</p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="library-section" id="data">
            <div className="section-heading">
              <div>
                <span className="section-kicker">03 — DATA DISPLAY</span>
                <h2>Tables &amp; information</h2>
              </div>
              <span className="component-count">5 components</span>
            </div>
            <article className="specimen-card table-specimen">
              <div className="specimen-heading">
                <div>
                  <h3>Table</h3>
                  <p>Keep useful information organized and scannable.</p>
                </div>
                <span className="component-tag">DATA</span>
              </div>
              <div className="specimen-body">
                <Table>
                  <TableHeader backgroundColor="#f4f6f1">
                    <TableRow>
                      <TableCell text="Component" isHeader />
                      <TableCell text="Category" isHeader />
                      <TableCell text="Status" isHeader />
                    </TableRow>
                  </TableHeader>
                  <tbody>
                    <TableRow>
                      <TableCell text="Button" />
                      <TableCell text="Actions" />
                      <TableCell>
                        <span className="table-status">Ready</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell text="Dropdown" />
                      <TableCell text="Forms" />
                      <TableCell>
                        <span className="table-status">Ready</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell text="Card" />
                      <TableCell text="Content" />
                      <TableCell>
                        <span className="table-status">Ready</span>
                      </TableCell>
                    </TableRow>
                  </tbody>
                  <TableFooter backgroundColor="#f4f6f1">
                    <TableRow>
                      <TableCell text="3 shown" />
                      <TableCell text="13 total" />
                      <TableCell text="All systems go" />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </article>
          </section>

          <footer className="page-footer">
            <span className="footer-mark">✳</span>
            <span>Made to make good things.</span>
            <span className="footer-right">
              UI GARDEN <span>·</span> REACT COMPONENT LIBRARY
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
