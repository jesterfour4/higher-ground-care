# 🚨 **Netlify 404 Troubleshooting Guide**

## 🔍 **Issue: 404 on Netlify Subdomain**

Your site builds successfully but shows 404 on the `*.netlify.app` subdomain.

## ✅ **What We've Fixed**

1. **✅ Fixed metadataBase** - Was hardcoded to production domain
2. **✅ Added test page** - `/test` route for debugging
3. **✅ Updated package.json** - Consistent naming
4. **✅ Enhanced netlify.toml** - Better build environment config
5. **✅ Verified all routes** - Build shows 12/12 pages generated

## 🚀 **Immediate Action Steps**

### **Step 1: Clear Cache & Redeploy**
1. Go to **Netlify Dashboard → Deploys**
2. Click **"Trigger deploy" → "Clear cache and deploy site"**
3. Wait for build to complete
4. Check the `*.netlify.app` URL

### **Step 2: Verify Build Settings**
In **Site settings → Build & deploy → Build settings**:

```
Base directory: (leave blank)
Build command: next build
Publish directory: .next
```

### **Step 3: Check Environment Variables**
In **Site settings → Environment variables**:

```
NODE_VERSION: 20
NEXT_TELEMETRY_DISABLED: 1
```

## 🔧 **Advanced Troubleshooting**

### **If Still 404, Check These:**

#### **1. Build Logs**
- Go to **Deploys → Latest deploy → Logs**
- Look for:
  - ✅ "Plugin @netlify/plugin-nextjs loaded"
  - ✅ "Publish directory .next exists"
  - ❌ "Publish directory does not exist"
  - ❌ "No pages were built"

#### **2. Plugin Installation**
Verify in build logs:
```
Plugin @netlify/plugin-nextjs loaded
```

If missing, the plugin isn't working.

#### **3. File Structure**
Ensure your repo root contains:
- ✅ `netlify.toml`
- ✅ `package.json`
- ✅ `app/` directory
- ✅ `next.config.js`

## 🧪 **Test Routes**

After deployment, test these URLs on your `*.netlify.app` subdomain:

1. **Root:** `/` - Should show homepage
2. **Test:** `/test` - Should show "Test Page - Higher Ground Care"
3. **Services:** `/services` - Should show services page
4. **About:** `/about` - Should show about page

## 🚨 **Common Causes & Fixes**

### **Cause 1: Wrong Publish Directory**
**Symptom:** "Publish directory does not exist"
**Fix:** Ensure publish directory is `.next` (not `out/` or `dist/`)

### **Cause 2: Plugin Not Working**
**Symptom:** No mention of `@netlify/plugin-nextjs` in logs
**Fix:** 
1. Verify plugin is in `package.json` devDependencies
2. Check `netlify.toml` has correct plugin config
3. Clear cache and redeploy

### **Cause 3: Node Version Mismatch**
**Symptom:** Build fails or behaves unexpectedly
**Fix:** Set `NODE_VERSION: 20` in Netlify environment variables

### **Cause 4: SPA Fallback Interference**
**Symptom:** Routes work but show wrong content
**Fix:** Remove any `/* /index.html 200` rules from `_redirects` or `netlify.toml`

## 🔍 **Debugging Commands**

### **Local Build Test**
```bash
npm ci
npm run build
ls -la .next
```

### **Check Plugin Installation**
```bash
npm list @netlify/plugin-nextjs
```

### **Verify Netlify Config**
```bash
cat netlify.toml
```

## 📋 **Verification Checklist**

- [ ] Build succeeds locally (`npm run build`)
- [ ] `.next` directory contains build output
- [ ] `netlify.toml` exists in repo root
- [ ] `@netlify/plugin-nextjs` in package.json
- [ ] Build logs show plugin loaded
- [ ] Publish directory is `.next`
- [ ] Node version is 20
- [ ] No SPA fallback rules
- [ ] Test page `/test` accessible

## 🆘 **Still Not Working?**

### **Option 1: Minimal Test**
Replace your `app/page.tsx` temporarily with:

```tsx
export default function Page() {
  return <main style={{padding: 24}}>Hello from Higher Ground Care</main>;
}
```

Deploy and test. If this works, the issue is in your page content.

### **Option 2: Check Plugin Version**
Try updating the plugin:
```bash
npm install --save-dev @netlify/plugin-nextjs@latest
```

### **Option 3: Contact Netlify Support**
If all else fails, contact Netlify support with:
- Build logs
- Your `netlify.toml`
- Repository structure
- Error screenshots

## 🎯 **Expected Result**

After following these steps, your `*.netlify.app` subdomain should:
- ✅ Load the homepage at `/`
- ✅ Show the test page at `/test`
- ✅ Navigate between all routes
- ✅ Display your Higher Ground Care content

---

**🚀 Your site should work on Netlify! If not, we'll debug it step by step.**
