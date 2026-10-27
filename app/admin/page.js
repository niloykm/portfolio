"use client";

import { useEffect, useState, useCallback } from "react";
import { 
  Lock, ArrowRight, LayoutDashboard, Plus, Edit2, Trash2, 
  Globe, LogOut, CheckCircle2, AlertCircle, Laptop, Eye, HelpCircle 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Portfolio state
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  // Edit / Add Item States
  const [editingId, setEditingId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "Web App",
    bgImageName: "handsOn",
    bgImage: "", // Custom Cloudinary URL string
    url: "",
    github: ""
  });
  const [serviceForm, setServiceForm] = useState({
    iconName: "fe_icon",
    title: "",
    description: ""
  });

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setPortfolioData(data);
      }
    } catch (err) {
      showStatus("error", "Failed to load portfolio database.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verify authentication on mount
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchPortfolio();
        showStatus("success", "Authenticated successfully.");
      } else {
        setLoginError(data.error || "Authentication failed.");
      }
    } catch {
      setLoginError("Failed to reach auth gateway.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setPassword("");
      showStatus("info", "Logged out successfully.");
    } catch {
      showStatus("error", "Logout failed.");
    }
  };

  const showStatus = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleSavePortfolio = async (updatedData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        setPortfolioData(updatedData);
        showStatus("success", "Portfolio database compiled and saved successfully.");
        resetForms();
      } else {
        const data = await res.json();
        if (res.status === 401) {
          setIsAuthenticated(false);
          showStatus("error", "Session expired. Please re-authenticate.");
        } else {
          showStatus("error", data.error || "Save execution failed.");
        }
      }
    } catch {
      showStatus("error", "Server communication link interrupted.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForms = () => {
    setEditingId(null);
    setProjectForm({
      title: "",
      description: "Web App",
      bgImageName: "handsOn",
      bgImage: "",
      url: "",
      github: ""
    });
    setServiceForm({
      iconName: "fe_icon",
      title: "",
      description: ""
    });
  };

  // CRUD: Projects
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploadLoading(true);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dniloy";
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio_unsigned";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setProjectForm(prev => ({
          ...prev,
          bgImage: data.secure_url,
          bgImageName: "" // clear fallback
        }));
        showStatus("success", "Image uploaded successfully to Cloudinary.");
      } else {
        const errData = await res.json();
        showStatus("error", errData.error?.message || "Cloudinary upload failed. Check credentials.");
      }
    } catch {
      showStatus("error", "Network connection to Cloudinary failed.");
    } finally {
      setImageUploadLoading(false);
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!projectForm.title) return;
    const newProject = {
      ...projectForm,
      id: Date.now().toString()
    };
    const updated = {
      ...portfolioData,
      workData: [...portfolioData.workData, newProject]
    };
    handleSavePortfolio(updated);
  };

  const handleEditProject = (item) => {
    setEditingId(item.id);
    setProjectForm({
      title: item.title,
      description: item.description || "Web App",
      bgImageName: item.bgImageName || "handsOn",
      bgImage: item.bgImage || "",
      url: item.url || "",
      github: item.github || ""
    });
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const updatedWork = portfolioData.workData.map(p => 
      p.id === editingId ? { ...projectForm, id: editingId } : p
    );
    const updated = { ...portfolioData, workData: updatedWork };
    handleSavePortfolio(updated);
  };

  const handleDeleteProject = (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const updatedWork = portfolioData.workData.filter(p => p.id !== id);
    const updated = { ...portfolioData, workData: updatedWork };
    handleSavePortfolio(updated);
  };

  // CRUD: Services
  const handleAddService = (e) => {
    e.preventDefault();
    if (!serviceForm.title) return;
    const newService = {
      ...serviceForm,
      id: Date.now().toString()
    };
    const updated = {
      ...portfolioData,
      serviceData: [...portfolioData.serviceData, newService]
    };
    handleSavePortfolio(updated);
  };

  const handleEditService = (item) => {
    setEditingId(item.id);
    setServiceForm({
      iconName: item.iconName || "fe_icon",
      title: item.title,
      description: item.description
    });
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    const updatedServices = portfolioData.serviceData.map(s => 
      s.id === editingId ? { ...serviceForm, id: editingId } : s
    );
    const updated = { ...portfolioData, serviceData: updatedServices };
    handleSavePortfolio(updated);
  };

  const handleDeleteService = (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const updatedServices = portfolioData.serviceData.filter(s => s.id !== id);
    const updated = { ...portfolioData, serviceData: updatedServices };
    handleSavePortfolio(updated);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative cyber-grid">
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-r-blue-400 border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-blue-400 font-mono tracking-widest text-sm uppercase animate-pulse">Initializing Database Interface...</p>
        </div>
      </div>
    );
  }

  // --- LOGIN PANEL ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative px-6 overflow-hidden cyber-grid">
        {/* Decorative Glow Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />

        <div className="relative z-10 w-full max-w-md">
          {/* Back Home button */}
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-blue-400 mb-6 transition-colors">
            <ArrowRight className="w-3 h-3 rotate-180" />
            RETURN_TO_PORTFOLIO
          </Link>

          <div className="glass-card cyber-corner p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-blue-600 rounded-xl mb-4 text-white">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white font-sans tracking-wide">SECURE_GATEWAY</h2>
              <p className="text-xs text-slate-500 font-mono mt-1 uppercase">Authentication Required</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Access Key</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  required
                  className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-700"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-950/40 border border-red-800/30 rounded-lg flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 flex items-center justify-center gap-2 transition-all group"
              >
                Authenticate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN CRUD DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative cyber-grid">
      {/* Decorative Glow Elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header bar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold tracking-wide text-white">CONTROL_PANEL</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute" />
                <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Database Sync Active</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="px-4 py-2 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5" />
              View Site
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 border border-slate-800 hover:border-red-500/50 hover:bg-red-500/5 text-slate-400 hover:text-red-400 rounded-lg transition-all"
              title="Logout session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      {statusMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-sm">
          <div className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 border ${
            statusMessage.type === "success" 
              ? "bg-emerald-950/90 text-emerald-300 border-emerald-800/40" 
              : statusMessage.type === "error" 
              ? "bg-red-950/90 text-red-300 border-red-800/40" 
              : "bg-blue-950/90 text-blue-300 border-blue-800/40"
          }`}>
            {statusMessage.type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <p className="text-xs font-mono font-medium">{statusMessage.text}</p>
          </div>
        </div>
      )}

      {/* Main content grid */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card cyber-corner p-4 rounded-xl">
            <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Database Tables</h2>
            <nav className="space-y-2">
              <button
                onClick={() => { setActiveTab("projects"); resetForms(); }}
                className={`w-full px-4 py-3 rounded-lg font-medium text-sm flex items-center justify-between transition-all ${
                  activeTab === "projects" 
                    ? "bg-blue-600/15 border-l-2 border-blue-500 text-blue-400" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <span>Projects (Work)</span>
                <span className="text-xs px-2 py-0.5 bg-slate-900 rounded font-mono text-slate-400">
                  {portfolioData?.workData?.length || 0}
                </span>
              </button>
              <button
                onClick={() => { setActiveTab("services"); resetForms(); }}
                className={`w-full px-4 py-3 rounded-lg font-medium text-sm flex items-center justify-between transition-all ${
                  activeTab === "services" 
                    ? "bg-blue-600/15 border-l-2 border-blue-500 text-blue-400" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <span>Services</span>
                <span className="text-xs px-2 py-0.5 bg-slate-900 rounded font-mono text-slate-400">
                  {portfolioData?.serviceData?.length || 0}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Action Panel and Table list */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: PROJECTS */}
          {activeTab === "projects" && (
            <div className="grid md:grid-cols-12 gap-8">
              
              {/* Form Block */}
              <div className="md:col-span-5">
                <div className="glass-card cyber-corner p-6 rounded-xl space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <h3 className="font-extrabold text-white text-base">
                      {editingId ? "EDIT_PROJECT" : "CREATE_PROJECT"}
                    </h3>
                  </div>

                  <form onSubmit={editingId ? handleUpdateProject : handleAddProject} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Project Title</label>
                      <input 
                        type="text" 
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. Finance Dashboard"
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Tag/Description</label>
                      <input 
                        type="text" 
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="e.g. Web App, Website"
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Background Image Source</label>
                      <select 
                        value={projectForm.bgImageName}
                        onChange={(e) => setProjectForm({ ...projectForm, bgImageName: e.target.value, bgImage: "" })}
                        disabled={!!projectForm.bgImage}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 cursor-pointer disabled:opacity-50"
                      >
                        <option value="">-- Choose local asset fallback --</option>
                        <option value="handsOn">handsOn (Event Management)</option>
                        <option value="newcare">newcare (Appointment)</option>
                        <option value="ndemy1">ndemy1 (Ndemy LMS)</option>
                        <option value="nqr">nqr (QR Generator)</option>
                        <option value="nrl">nrl (Url Shortener)</option>
                        <option value="nobot">nobot (AI Chatbot)</option>
                        <option value="niloyinventory">niloyinventory (Inventory)</option>
                      </select>

                      <div className="relative my-3 flex items-center justify-center">
                        <div className="border-t border-slate-800 w-full" />
                        <span className="absolute bg-slate-950 px-3 text-[10px] font-mono text-slate-500 uppercase">OR</span>
                      </div>

                      {/* Cloudinary Drag-and-drop / File upload zone */}
                      <div className="border border-dashed border-slate-800 rounded p-4 text-center hover:border-blue-500/50 transition-colors cursor-pointer relative bg-slate-900/30">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={imageUploadLoading}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {imageUploadLoading ? (
                          <div className="text-xs text-blue-400 font-mono animate-pulse uppercase">Uploading to Cloudinary...</div>
                        ) : projectForm.bgImage ? (
                          <div className="space-y-2">
                            <p className="text-[10px] text-emerald-400 font-mono uppercase font-bold">✔ Cloudinary link attached</p>
                            <p className="text-xs text-slate-400 truncate max-w-[200px] mx-auto">{projectForm.bgImage}</p>
                            <button
                              type="button"
                              onClick={() => setProjectForm({ ...projectForm, bgImage: "", bgImageName: "handsOn" })}
                              className="text-[10px] text-red-400 hover:text-red-300 font-mono uppercase underline z-10 relative"
                            >
                              Remove link
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1 text-slate-400">
                            <p className="text-xs">Upload custom project image</p>
                            <p className="text-[9px] text-slate-500 font-mono uppercase">Directly to Cloudinary</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Live Demo Link</label>
                      <input 
                        type="url" 
                        value={projectForm.url}
                        onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">GitHub Repository Link</label>
                      <input 
                        type="url" 
                        value={projectForm.github}
                        onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                        placeholder="https://github.com/niloydiu/..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {editingId ? "Save Change" : "Add Project"}
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          onClick={resetForms}
                          className="px-3 py-2 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs font-semibold rounded transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Data Table List Block */}
              <div className="md:col-span-7 space-y-4">
                <div className="glass-card cyber-corner p-6 rounded-xl">
                  <h3 className="font-extrabold text-white text-base mb-4">PROJECTS_LIST</h3>
                  
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {portfolioData?.workData?.map((item) => (
                      <div 
                        key={item.id}
                        className="p-4 bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-lg flex items-center justify-between gap-4 transition-all"
                      >
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 font-mono uppercase">
                            <span>{item.description}</span>
                            <span>•</span>
                            <span className="text-slate-400">{item.bgImageName || "Cloudinary Image"}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {item.url && (
                            <a href={item.url} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-blue-400" title="Open live url">
                              <Globe className="w-4 h-4" />
                            </a>
                          )}
                          <button 
                            onClick={() => handleEditProject(item)}
                            className="p-1.5 text-slate-400 hover:text-amber-400" 
                            title="Edit project"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400" 
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!portfolioData?.workData || portfolioData.workData.length === 0) && (
                      <p className="text-slate-500 text-xs font-mono uppercase text-center py-8">No project elements in database.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SERVICES */}
          {activeTab === "services" && (
            <div className="grid md:grid-cols-12 gap-8">
              
              {/* Form Block */}
              <div className="md:col-span-5">
                <div className="glass-card cyber-corner p-6 rounded-xl space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <h3 className="font-extrabold text-white text-base">
                      {editingId ? "EDIT_SERVICE" : "CREATE_SERVICE"}
                    </h3>
                  </div>

                  <form onSubmit={editingId ? handleUpdateService : handleAddService} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Service Title</label>
                      <input 
                        type="text" 
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        placeholder="e.g. Graphic Designing"
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Icon Asset Key</label>
                      <select 
                        value={serviceForm.iconName}
                        onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 cursor-pointer"
                      >
                        <option value="fe_icon">fe_icon (Frontend)</option>
                        <option value="be_icon">be_icon (Backend)</option>
                        <option value="api_icon">api_icon (API Development)</option>
                        <option value="fs_icon">fs_icon (Full Stack)</option>
                        <option value="web_icon">web_icon (Web Icon)</option>
                        <option value="mobile_icon">mobile_icon (Mobile Icon)</option>
                        <option value="ui_icon">ui_icon (UI UX Design)</option>
                        <option value="graphics_icon">graphics_icon (Graphics)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Description</label>
                      <textarea 
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        placeholder="Short overview of the service details..."
                        required
                        rows={4}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 resize-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {editingId ? "Save Change" : "Add Service"}
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          onClick={resetForms}
                          className="px-3 py-2 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs font-semibold rounded transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Data Table List Block */}
              <div className="md:col-span-7 space-y-4">
                <div className="glass-card cyber-corner p-6 rounded-xl">
                  <h3 className="font-extrabold text-white text-base mb-4">SERVICES_LIST</h3>
                  
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {portfolioData?.serviceData?.map((item) => (
                      <div 
                        key={item.id}
                        className="p-4 bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-lg flex items-start justify-between gap-4 transition-all"
                      >
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
                          <p className="text-xs text-slate-400 leading-normal mt-1">{item.description}</p>
                          <span className="text-[10px] text-slate-600 font-mono uppercase mt-2 block">{item.iconName}</span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button 
                            onClick={() => handleEditService(item)}
                            className="p-1.5 text-slate-400 hover:text-amber-400" 
                            title="Edit service"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteService(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400" 
                            title="Delete service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!portfolioData?.serviceData || portfolioData.serviceData.length === 0) && (
                      <p className="text-slate-500 text-xs font-mono uppercase text-center py-8">No service elements in database.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
