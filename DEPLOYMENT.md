# 🚀 Deployment Guide

## Deploying Salt & Smoke API

This guide covers deploying the API to popular hosting platforms.

### Prerequisites

- Fully tested API locally
- All dependencies in `package.json`
- `.env` configured for production
- `.gitignore` updated (includes `database.db`)

---

## 🏃 Quick Deployment Summary

| Platform | Setup | Cost | Notes |
|----------|-------|------|-------|
| **Railway** | 1 click | Free tier | Best for beginners |
| **Heroku** | Manual | $7+/month | Reliable, widely used |
| **AWS Lightsail** | Manual | $3.50+/month | Scalable |
| **DigitalOcean** | Manual | $4+/month | Simple VPS |
| **Render** | 1 click | Free tier | GitHub integration |

---

## 🚄 Railway (Recommended for Beginners)

### Steps

1. **Sign up**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create project**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect your Salt & Smoke repo

3. **Configure**
   - Railway auto-detects Node.js
   - Sets up `npm start` command
   - Automatically manages `database.db`

4. **Deploy**
   - Push to GitHub
   - Railway auto-deploys
   - Get URL instantly

5. **Environment Variables**
   - Add `.env` variables in Railway dashboard
   - Set `NODE_ENV=production`

**Cost**: Free tier available
**URL**: https://your-project.railway.app

---

## 🟩 Heroku

### Steps

1. **Install Heroku CLI**
   ```bash
   brew install heroku
   heroku login
   ```

2. **Create app**
   ```bash
   heroku create your-salt-smoke-api
   ```

3. **Create Procfile**
   ```bash
   echo "web: node server.js" > Procfile
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5000
   ```

6. **Monitor logs**
   ```bash
   heroku logs --tail
   ```

**Cost**: $7+/month (after free tier)
**URL**: https://your-salt-smoke-api.herokuapp.com

---

## ☁️ AWS Lightsail

### Steps

1. **Create instance**
   - Go to AWS Lightsail
   - Create "Node.js" instance
   - Choose instance plan ($3.50+/month)

2. **Connect via SSH**
   ```bash
   ssh -i key.pem ubuntu@your-ip
   ```

3. **Clone repo**
   ```bash
   git clone your-repo-url
   cd Salt\ \&\ Smoke
   ```

4. **Install & start**
   ```bash
   npm install
   npm start
   ```

5. **Use PM2 for persistence**
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

6. **Set up firewall**
   - Allow port 5000 in Lightsail firewall

**Cost**: $3.50+/month
**URL**: http://your-lightsail-ip:5000

---

## 💧 DigitalOcean Droplet

### Steps

1. **Create droplet**
   - Go to DigitalOcean
   - Create Ubuntu 20.04 droplet ($4+/month)

2. **SSH into droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone & setup**
   ```bash
   git clone your-repo-url
   cd Salt\ \&\ Smoke
   npm install
   ```

5. **Use PM2**
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx reverse proxy**
   ```bash
   sudo apt install nginx
   ```

   Edit `/etc/nginx/sites-available/default`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

**Cost**: $4+/month
**URL**: http://your-domain.com

---

## 🎯 Render

### Steps

1. **Sign up**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create service**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repo

3. **Configure**
   - Select "Node"
   - Build command: `npm install`
   - Start command: `npm start`

4. **Deploy**
   - Render auto-deploys on git push

5. **Environment**
   - Add env vars in dashboard
   - Set `NODE_ENV=production`

**Cost**: Free tier available
**URL**: https://your-service.onrender.com

---

## 🔒 Production Considerations

### Before Deploying

1. **Security**
   ```bash
   # Update dependencies
   npm audit
   npm audit fix
   ```

2. **Environment**
   ```bash
   # Ensure .env is NOT committed
   grep .env .gitignore
   ```

3. **Database**
   - Database persists between restarts
   - Consider backup strategy for production

4. **Logging**
   - Monitor logs: `heroku logs --tail`
   - Set up error tracking (Sentry, etc.)

5. **SSL/HTTPS**
   - Most platforms provide free SSL
   - Update CORS for HTTPS URLs

### .env for Production

```env
PORT=5000
NODE_ENV=production
```

### Frontend CORS Update

Update your `index.html` or `main.js`:

```javascript
// Before (development):
const API_URL = 'http://localhost:5000/api';

// After (production):
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-url.com/api'
  : 'http://localhost:5000/api';
```

Or set via environment:
```javascript
const API_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:5000/api'
  : 'https://your-deployed-api.com/api';
```

---

## 📊 Monitoring & Maintenance

### Check Server Health

```bash
# Test API
curl https://your-api-url.com/api/health

# View logs (Heroku example)
heroku logs --tail

# SSH into server (Lightsail/DigitalOcean)
ssh -i key.pem ubuntu@your-ip
```

### Update Database

```bash
# SSH into server
ssh your-server

# Backup current database
cp database.db database.db.backup

# Restart server (PM2 example)
pm2 restart server.js
```

### Scale Up

If you need better performance:
- Upgrade to larger instance tier
- Add more memory/CPU
- Consider database migration (PostgreSQL)

---

## 🆘 Troubleshooting Deployment

### Server won't start
```bash
# Check logs
pm2 logs server.js
# or
heroku logs --tail

# Check port
netstat -tuln | grep 5000
```

### Database errors
```bash
# SSH into server
ssh your-server

# Check database
ls -lh database.db

# Restart with fresh database
rm database.db
pm2 restart server.js
```

### CORS errors
- Update `api-client.js` with correct `API_URL`
- Ensure frontend can reach API URL
- Check CORS configuration in `server.js`

### High memory usage
- Check for memory leaks: `pm2 monitor`
- Restart periodically: `pm2 cron "0 0 * * *" restart server.js`
- Consider upgrading instance

---

## 📝 Post-Deployment Checklist

- [ ] API responds to health check
- [ ] All endpoints tested
- [ ] Database initialized and data persists
- [ ] CORS works from frontend
- [ ] Environment variables set
- [ ] Logs accessible and monitored
- [ ] Domain/URL documented
- [ ] Team informed of new API URL
- [ ] Frontend updated with API URL
- [ ] Backups configured

---

## 🎉 You're Live!

Your Salt & Smoke API is now deployed and accessible to your frontend!

### Next Steps

1. Update frontend to use deployed API URL
2. Test all features end-to-end
3. Monitor logs and performance
4. Consider adding:
   - Authentication
   - Email notifications
   - Payment processing
   - Admin dashboard

---

## 📞 Support

- **Railway Documentation**: https://docs.railway.app/
- **Heroku Documentation**: https://devcenter.heroku.com/
- **AWS Lightsail Documentation**: https://docs.aws.amazon.com/lightsail/
- **DigitalOcean Documentation**: https://docs.digitalocean.com/
- **Render Documentation**: https://render.com/docs

---

**Happy deploying! 🚀**
