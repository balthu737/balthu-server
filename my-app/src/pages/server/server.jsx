import './Server.css'

const SERVICES = [
  { name: 'nginx',      status: 'on'  },
  { name: 'ssh.socket', status: 'on'  },
  { name: 'docker',     status: 'off' },
  { name: 'mysql',      status: 'off' },
]

const STATS = [
  { num: '11%',  unit: 'DISCO USADO',      bar: 11  },
  { num: '5%',   unit: 'RAM USADA',        bar: 5   },
  { num: '25GB', unit: 'ALMACENAMIENTO',   bar: 44  },
]

const TERMINAL_LINES = [
  { cmd: 'hostname',   val: 'BalthuServer',              warn: false },
  { cmd: 'uptime',     val: 'up 0 days, corriendo bien', warn: false },
  { cmd: 'disk usage', val: '11.3% de 24.44GB',          warn: false },
  { cmd: 'kernel',     val: '6.8.0-110-generic',         warn: false },
  { cmd: 'last login', val: 'balthu via SSH · hoy',      warn: true  },
]

export default function Server() {
  return (
    <div className="server-page">

      {/* Header */}
      <div className="page-header fade-in">
        <div className="page-label">// servidor personal</div>
        <div className="page-title">BALTHU<br /><span className="title-dim">SERVER</span></div>
        <div className="page-subtitle">
          192.168.100.151 &nbsp;·&nbsp; x86_64 &nbsp;·&nbsp; Linux Ubuntu Server
          <span className="cursor" />
        </div>
      </div>

      {/* Terminal block */}
      <div className="srv-terminal fade-in" style={{ animationDelay: '0.1s' }}>
        <span className="srv-terminal-tag">SYSTEM INFO</span>
        {TERMINAL_LINES.map((l, i) => (
          <div key={i} className="t-line">
            <span className="t-prompt">$</span>
            <span className="t-cmd">{l.cmd}</span>
            <span className={`t-val ${l.warn ? 'warn' : ''}`}>{l.val}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid-3 fade-in" style={{ animationDelay: '0.2s', marginBottom: 32 }}>
        {STATS.map((s, i) => (
          <div key={i} className="card stat-card">
            <div className="stat-num">{s.num}</div>
            <div className="card-label">{s.unit}</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${s.bar}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="section-label fade-in" style={{ animationDelay: '0.3s' }}>// servicios activos</div>
      <div className="grid-2 fade-in" style={{ animationDelay: '0.35s', marginBottom: 0 }}>
        {SERVICES.map((s, i) => (
          <div key={i} className={`srv-service ${s.status}`}>
            <div className={`dot dot-${s.status === 'on' ? 'green' : 'dim'}`} />
            <span className="srv-name">{s.name}</span>
            <span className={`srv-status ${s.status}`}>{s.status === 'on' ? 'RUNNING' : 'STOPPED'}</span>
          </div>
        ))}
      </div>

    </div>
  )
}