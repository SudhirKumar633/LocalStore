import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../../components/auth/AuthInput";
import { register } from "../../api/authApi";
import { fetchShopTypes } from "../../api/shopTypeApi";

const initialState = {
  shopName: "",
  ownerName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  shopType: "",
  gstin: "",
  openingHours: "",
  closingHours: "",
  logo: null,
  acceptTerms: false,
};



const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [shopTypes, setShopTypes] = useState([]);
  useEffect(() => {
    fetchShopTypes().then((types) => setShopTypes(types)).catch(() => setShopTypes([]));
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoError, setLogoError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        const maxSize = 1024 * 1024; // 1MB
        if (!allowedTypes.includes(file.type)) {
          setLogoError("Logo must be JPG, JPEG, PNG, or WEBP format.");
          setFormData((prev) => ({ ...prev, [name]: null }));
          return;
        }
        if (file.size > maxSize) {
          setLogoError("Logo must be less than 1MB.");
          setFormData((prev) => ({ ...prev, [name]: null }));
          return;
        }
        setLogoError("");
        setFormData((prev) => ({ ...prev, [name]: file }));
      } else {
        setLogoError("");
        setFormData((prev) => ({ ...prev, [name]: null }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "password") {
        setPasswordStrength(getPasswordStrength(value));
      }
    }
  };

  function getPasswordStrength(pw) {
    if (!pw) return "";
    if (pw.length < 6) return "Weak";
    if (pw.match(/[A-Z]/) && pw.match(/[0-9]/) && pw.match(/[^A-Za-z0-9]/)) return "Strong";
    if (pw.length >= 8) return "Medium";
    return "Weak";
  }

  const validate = () => {
    if (!formData.shopName || !formData.ownerName || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword || !formData.address || !formData.city || !formData.state || !formData.pincode || !formData.shopType) {
      return "Please fill all required fields.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    if (!formData.acceptTerms) {
      return "You must accept the terms and conditions.";
    }
    if (logoError) {
      return logoError;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      // Prepare data for backend (handle file upload if needed)
      const submitData = { ...formData };
      // Remove confirmPassword and acceptTerms from payload
      delete submitData.confirmPassword;
      delete submitData.acceptTerms;
      // If logo is present, handle file upload (not implemented here)
      const res = await register(submitData);
      localStorage.setItem("token", res.token);
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      let errorMsg = "Registration failed";
      if (err?.response?.data) {
        if (typeof err.response.data === "string") {
          errorMsg = err.response.data;
        } else if (err.response.data.message) {
          errorMsg = err.response.data.message;
        } else if (err.response.data.errors) {
          errorMsg = err.response.data.errors.map(e => e.msg || e.message || JSON.stringify(e)).join(", ");
        } else {
          errorMsg = JSON.stringify(err.response.data);
        }
      } else if (err?.message) {
        errorMsg = err.message;
      } else {
        errorMsg = JSON.stringify(err);
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Shop Registration</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuthInput
            label="Shop Name"
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            placeholder="Enter shop name"
            required
          />
          <AuthInput
            label="Owner Name"
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Enter owner name"
            required
          />
          <AuthInput
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
          <AuthInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="border rounded px-3 py-2"
              required
            />
            {formData.password && (
              <span className={`text-xs mt-1 ${passwordStrength === "Strong" ? "text-green-600" : passwordStrength === "Medium" ? "text-yellow-600" : "text-red-600"}`}>Password strength: {passwordStrength}</span>
            )}
          </div>
          <AuthInput
            label="GSTIN (optional)"
            type="text"
            name="gstin"
            value={formData.gstin}
            onChange={handleChange}
            placeholder="Enter GSTIN"
          />
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Shop Type</label>
            <select
              name="shopType"
              value={formData.shopType}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            >
              <option value="">Select type</option>
              {shopTypes.map((type) => (
                <option key={type._id || type.name} value={type.name}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <AuthInput
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
          <AuthInput
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
          <AuthInput
            label="State"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            required
          />
          <AuthInput
            label="Pincode"
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter pincode"
            required
          />
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Opening Hours</label>
            <input
              type="time"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Closing Hours</label>
            <input
              type="time"
              name="closingHours"
              value={formData.closingHours}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Shop Logo (JPG, JPEG, PNG, WEBP, max 1MB, optional)</label>
            <input
              type="file"
              name="logo"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            {logoError && <span className="text-xs text-red-600 mt-1">{logoError}</span>}
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mr-2"
            required
          />
          <span className="text-sm">I accept the <a href="#" className="text-blue-600 underline">terms and conditions</a></span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full mt-6 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
