# 🚀 Netlify Deployment Guide for Higher Ground Care

## ✅ **Pre-Deployment Checklist Completed**

- [x] `netlify.toml` created with correct Next.js configuration
- [x] `next.config.js` updated and Netlify-compatible
- [x] Package.json scripts verified (`build`, `start`, `dev`)
- [x] `@netlify/plugin-nextjs` installed
- [x] `.nvmrc` created (Node.js 20)
- [x] Local build test successful
- [x] HTTPS redirects configured

## 🌐 **Netlify Dashboard Setup**

### **1. Build Settings**
Go to **Site settings → Build & deploy → Build settings** and configure:

```
Build command: next build
Publish directory: .next
```

### **2. Environment Variables**
Add these in **Site settings → Environment variables**:

```
NODE_VERSION: 20
NEXT_TELEMETRY_DISABLED: 1
```

### **3. Domain Management**
In **Domain management**:

1. **Add custom domains:**
   - `www.highergroundcare.com` (or your domain)
   - `highergroundcare.com` (apex domain)

2. **Set Primary domain** to `www.highergroundcare.com`

3. **Enable HTTPS:**
   - SSL: Provisioned
   - Force HTTPS: ON

## 🔧 **DNS Configuration (Squarespace)**

### **For www subdomain:**
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

### **For apex domain (@):**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify's load balancer)
```

**OR use CNAME flattening if your DNS supports it:**
```
Type: CNAME
Name: @
Value: your-site-name.netlify.app
```

## 📱 **Deploy Process**

### **1. Connect Repository**
1. Go to **Sites** in Netlify
2. Click **"Add new site"**
3. Choose **"Import an existing project"**
4. Connect your GitHub/GitLab repository
5. Select the repository

### **2. Build Settings (Auto-configured)**
Netlify should automatically detect:
- Build command: `next build`
- Publish directory: `.next`
- Node version: 20 (from .nvmrc)

### **3. Deploy**
1. Click **"Deploy site"**
2. Wait for build to complete
3. Check the `*.netlify.app` subdomain first

## 🚨 **Troubleshooting**

### **Build Fails:**
- Check **Deploy logs** for errors
- Verify Node.js version is 20
- Ensure all dependencies are in `package.json`

### **404 on Custom Domain:**
- Verify DNS records point to correct Netlify site
- Check domain is set as Primary in Netlify
- Ensure HTTPS is provisioned

### **Routes Not Working:**
- Confirm using `.next` (not `out/` or `dist/`)
- Verify `@netlify/plugin-nextjs` is installed
- Remove any `_redirects` with `/* /index.html 200`

## 🔍 **Verification Steps**

### **1. Test Netlify Subdomain**
- Go to your `*.netlify.app` URL
- Verify all pages load correctly
- Test navigation between routes

### **2. Test Custom Domain**
- Visit your custom domain
- Check HTTPS redirect works
- Verify all pages and forms function

### **3. Test Forms**
- Submit contact form
- Submit feedback
- Verify data appears in Supabase

## 📋 **Post-Deployment Tasks**

- [ ] Test all pages on custom domain
- [ ] Verify contact form submissions
- [ ] Test feedback system
- [ ] Check mobile responsiveness
- [ ] Verify language toggle functionality
- [ ] Test "Higher Ground Guide" button
- [ ] Monitor error logs in Netlify

## 🆘 **Support**

If you encounter issues:
1. Check **Deploy logs** in Netlify
2. Verify **Build settings** match this guide
3. Ensure **DNS records** are correct
4. Test on **Netlify subdomain** first

---

**🎉 Your Higher Ground Care site should now deploy successfully on Netlify!**
