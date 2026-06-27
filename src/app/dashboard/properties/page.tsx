"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
    Plus,
    SearchLg,
    FilterLines,
    Edit01,
    Trash01,
    Eye,
    Building02,
    DownloadCloud02,
    UploadCloud02,
    File02,
    AlertCircle,
} from "@untitledui/icons";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import {
    useProperties,
    useDeleteProperty,
    usePropertyStats,
    fetchAllProperties,
    useBulkCreateProperties,
    type PropertyQueryParams,
    type Property,
    type PropertyStatus,
} from "@/lib/api/properties";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";

// React Aria Modal Components
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Heading as AriaHeading } from "react-aria-components";

// Pagination Component
import { PaginationPageDefault } from "@/components/application/pagination/pagination";

// ─── Status Badge Map ─────────────────────────────────────────────────────────

const statusConfig: Record<PropertyStatus, { label: string; color: "success" | "warning" | "error" | "gray" | "blue" | "brand" }> = {
    published: { label: "Published", color: "success" },
    draft: { label: "Draft", color: "gray" },
    "pending-review": { label: "Pending Review", color: "warning" },
    "under-offer": { label: "Under Offer", color: "blue" },
    sold: { label: "Sold", color: "error" },
    archived: { label: "Archived", color: "gray" },
};

const STATUS_FILTERS: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
    { label: "Pending Review", value: "pending-review" },
    { label: "Under Offer", value: "under-offer" },
    { label: "Sold", value: "sold" },
    { label: "Archived", value: "archived" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

// ─── Row Actions ──────────────────────────────────────────────────────────────

const PropertyRowActions = ({
    property,
    onDelete,
}: {
    property: Property;
    onDelete: (property: Property) => void;
}) => (
    <Dropdown.Root>
        <Dropdown.DotsButton />
        <Dropdown.Popover className="w-44">
            <Dropdown.Menu>
                <Dropdown.Item icon={Eye}>
                    <a href={`/dashboard/properties/${property._id}`} className="block w-full">
                        View
                    </a>
                </Dropdown.Item>
                <Dropdown.Item icon={Edit01}>
                    <a href={`/dashboard/properties/${property._id}/edit`} className="block w-full">
                        Edit
                    </a>
                </Dropdown.Item>
                <Dropdown.Item icon={Trash01} onAction={() => onDelete(property)}>
                    <span className="text-error-primary">Delete</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10">
            <Building02 className="h-7 w-7 text-brand-500" />
        </div>
        <h3 className="text-md font-semibold text-primary">No properties found</h3>
        <p className="mt-1 text-sm text-tertiary">Try adjusting your filters or add a new listing.</p>
        <Button className="mt-5" color="primary" size="md" iconLeading={Plus} onClick={onAdd}>
            Add Property
        </Button>
    </div>
);

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

const SkeletonRow = ({ id }: { id: string }) => (
    <Table.Row id={id}>
        {/* Property (Image + Title + Postcode) */}
        <Table.Cell>
            <div className="flex items-center gap-3">
                <div className="h-10 w-14 shrink-0 rounded-md bg-secondary animate-pulse" />
                <div className="space-y-1.5 w-28">
                    <div className="h-3.5 w-full bg-secondary animate-pulse rounded" />
                    <div className="h-2.5 w-12 bg-secondary animate-pulse rounded" />
                </div>
            </div>
        </Table.Cell>

        {/* Location */}
        <Table.Cell>
            <div className="h-3.5 w-24 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Type */}
        <Table.Cell>
            <div className="h-3.5 w-16 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Beds */}
        <Table.Cell>
            <div className="h-3.5 w-10 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Asking Price */}
        <Table.Cell>
            <div className="h-3.5 w-20 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Monthly Rent */}
        <Table.Cell>
            <div className="h-3.5 w-16 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Yield */}
        <Table.Cell>
            <div className="h-3.5 w-12 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Posted By */}
        <Table.Cell>
            <div className="space-y-1.5 w-24">
                <div className="h-3 w-20 bg-secondary animate-pulse rounded" />
                <div className="h-2 w-16 bg-secondary animate-pulse rounded" />
            </div>
        </Table.Cell>

        {/* Status */}
        <Table.Cell>
            <div className="h-6 w-20 bg-secondary animate-pulse rounded-full" />
        </Table.Cell>

        {/* Actions button */}
        <Table.Cell>
            <div className="h-8 w-8 bg-secondary animate-pulse rounded-md" />
        </Table.Cell>
    </Table.Row>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PropertiesPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
    const [params, setParams] = useState<PropertyQueryParams>({
        status: "all",
        page: 1,
        limit: 20,
    });
    const [search, setSearch] = useState("");
    const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [isBulkOpen, setIsBulkOpen] = useState(false);
    const [parsedProperties, setParsedProperties] = useState<any[] | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [selectedFileSize, setSelectedFileSize] = useState<number>(0);
    const bulkCreateMutation = useBulkCreateProperties();

    const validatePropertyRow = (p: any, rowNum: number): string[] => {
        const rowErrors: string[] = [];
        if (!p.title || p.title.trim().length < 10 || p.title.trim().length > 100) {
            rowErrors.push("Title is required and must be between 10 and 100 characters");
        }
        if (!p.description || p.description.trim() === "") {
            rowErrors.push("Description is required");
        }
        const validTypes = ["flat", "terraced", "semi-detached", "detached", "maisonette", "bungalow"];
        if (!p.propertyType || !validTypes.includes(p.propertyType)) {
            rowErrors.push(`Invalid property type "${p.propertyType}". Must be one of: ${validTypes.join(', ')}`);
        }
        if (p.bedrooms === undefined || isNaN(p.bedrooms) || p.bedrooms < 0) {
            rowErrors.push("Bedrooms must be a non-negative number");
        }
        if (p.bathrooms === undefined || isNaN(p.bathrooms) || p.bathrooms < 0) {
            rowErrors.push("Bathrooms must be a non-negative number");
        }
        if (!p.address || p.address.trim() === "") {
            rowErrors.push("Address is required");
        }
        if (!p.location || p.location.trim() === "") {
            rowErrors.push("Location is required");
        }
        if (!p.postcode || p.postcode.trim() === "") {
            rowErrors.push("Postcode is required");
        } else {
            const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]?$/i;
            if (!postcodeRegex.test(p.postcode)) {
                rowErrors.push("Invalid UK postcode outcode (e.g. M5, LS1, SW1A)");
            }
        }
        if (p.sqft === undefined || isNaN(p.sqft) || p.sqft <= 0) {
            rowErrors.push("Floor area (sqft) must be a positive number");
        }
        const validTenures = ["freehold", "leasehold", "share-of-freehold"];
        if (!p.tenure || !validTenures.includes(p.tenure)) {
            rowErrors.push(`Invalid tenure "${p.tenure}". Must be one of: ${validTenures.join(', ')}`);
        }
        if (p.investmentMetrics?.askingPrice === undefined || isNaN(p.investmentMetrics.askingPrice) || p.investmentMetrics.askingPrice <= 0) {
            rowErrors.push("Asking Price must be a positive number");
        }
        if (p.investmentMetrics?.monthlyRent === undefined || isNaN(p.investmentMetrics.monthlyRent) || p.investmentMetrics.monthlyRent <= 0) {
            rowErrors.push("Monthly Rent must be a positive number");
        }
        return rowErrors;
    };

    const handleFileDrop = (files: FileList) => {
        const file = files[0];
        if (!file) return;

        setSelectedFileName(file.name);
        setSelectedFileSize(file.size);

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text) return;

            const isXml = text.trim().startsWith("<?xml") || text.includes("<Workbook");
            const data = isXml ? parseXMLSpreadsheet(text) : parseCSV(text);

            if (data.length < 2) {
                setValidationErrors([`${isXml ? "Excel" : "CSV"} file must contain a header row and at least one property row.`]);
                setParsedProperties(null);
                return;
            }

            const headers = data[0].map(h => h.trim().toLowerCase());
            const rows = data.slice(1);

            const titleIdx = headers.indexOf("title");
            const descIdx = headers.indexOf("description");
            const typeIdx = headers.indexOf("property type");
            const bedsIdx = headers.indexOf("bedrooms");
            const bathsIdx = headers.indexOf("bathrooms");
            const addressIdx = headers.indexOf("address");
            const locationIdx = headers.indexOf("location");
            const postcodeIdx = headers.indexOf("postcode");
            const sqftIdx = headers.indexOf("floor area (sqft)");
            const tenureIdx = headers.indexOf("tenure");
            const priceIdx = headers.indexOf("asking price");
            const priceTypeIdx = headers.indexOf("price type");
            const rentIdx = headers.indexOf("monthly rent");
            const leaseYearsIdx = headers.indexOf("lease years remaining");
            const serviceChargeIdx = headers.indexOf("service charge");
            const groundRentIdx = headers.indexOf("ground rent");
            const taxBandIdx = headers.indexOf("council tax band");
            const tenentedIdx = headers.indexOf("tenanted");
            const tenancyStartIdx = headers.indexOf("tenancy start date");
            const tenancyTypeIdx = headers.indexOf("tenancy type");
            const fixedEndIdx = headers.indexOf("fixed term end date");
            const rentPaymentIdx = headers.indexOf("rent payment status");
            const rentCollectionIdx = headers.indexOf("rent collection");
            const arrearsIdx = headers.indexOf("arrears status");
            const depositIdx = headers.indexOf("deposit protected");
            const noticeIdx = headers.indexOf("notice served");
            const stayIdx = headers.indexOf("tenant wants to stay");
            const viewIdx = headers.indexOf("viewing arrangements");
            const rentReviewIdx = headers.indexOf("rent review date");
            const notesIdx = headers.indexOf("tenancy notes");
            const epcIdx = headers.indexOf("current epc");
            const potentialEpcIdx = headers.indexOf("potential epc");
            const displayHomeIdx = headers.indexOf("feature on homepage");
            const featuredIdx = headers.indexOf("featured investment");
            const highYieldIdx = headers.indexOf("high yield");
            const statusIdx = headers.indexOf("listing status");
            const latIdx = headers.indexOf("latitude");
            const lonIdx = headers.indexOf("longitude");
            const heroImageIdx = headers.indexOf("hero image url");

            if (titleIdx === -1 || descIdx === -1 || addressIdx === -1 || postcodeIdx === -1 || priceIdx === -1 || rentIdx === -1) {
                setValidationErrors(["File headers must include: 'Title', 'Description', 'Address', 'Postcode', 'Asking Price', and 'Monthly Rent'."]);
                setParsedProperties(null);
                return;
            }

            const parseBool = (val: string) => {
                const clean = String(val).trim().toLowerCase();
                return clean === "yes" || clean === "true";
            };

            const propertiesToValidate: any[] = [];
            const errors: string[] = [];

            rows.forEach((row, idx) => {
                if (row.length === 0 || (row.length === 1 && row[0] === "")) return;

                const p = {
                    title: titleIdx !== -1 ? (row[titleIdx] || "") : "",
                    description: descIdx !== -1 ? (row[descIdx] || "") : "",
                    propertyType: typeIdx !== -1 ? (row[typeIdx] || "flat").toLowerCase() : "flat",
                    bedrooms: bedsIdx !== -1 ? Number(row[bedsIdx] || 0) : 0,
                    bathrooms: bathsIdx !== -1 ? Number(row[bathsIdx] || 0) : 0,
                    address: addressIdx !== -1 ? (row[addressIdx] || "") : "",
                    location: locationIdx !== -1 ? (row[locationIdx] || "") : "",
                    postcode: postcodeIdx !== -1 ? (row[postcodeIdx] || "") : "",
                    sqft: sqftIdx !== -1 ? Number(row[sqftIdx] || 0) : 0,
                    tenure: tenureIdx !== -1 ? (row[tenureIdx] || "freehold").toLowerCase() : "freehold",
                    heroImage: heroImageIdx !== -1 ? (row[heroImageIdx] || "") : "",
                    investmentMetrics: {
                        askingPrice: priceIdx !== -1 ? Number(row[priceIdx] || 0) : 0,
                        monthlyRent: rentIdx !== -1 ? Number(row[rentIdx] || 0) : 0,
                        annualRent: rentIdx !== -1 ? Number(row[rentIdx] || 0) * 12 : 0,
                        grossYield: (priceIdx !== -1 && rentIdx !== -1 && Number(row[priceIdx]) > 0)
                            ? parseFloat(((Number(row[rentIdx]) * 12 / Number(row[priceIdx])) * 100).toFixed(2))
                            : 0,
                        leaseYearsRemaining: leaseYearsIdx !== -1 && row[leaseYearsIdx] && !isNaN(Number(row[leaseYearsIdx])) ? Number(row[leaseYearsIdx]) : undefined,
                    },
                    priceType: priceTypeIdx !== -1 && row[priceTypeIdx] ? row[priceTypeIdx] : null,
                    serviceCharge: serviceChargeIdx !== -1 && row[serviceChargeIdx] ? Number(row[serviceChargeIdx]) : 0,
                    groundRent: groundRentIdx !== -1 && row[groundRentIdx] ? Number(row[groundRentIdx]) : 0,
                    councilTaxBand: taxBandIdx !== -1 && row[taxBandIdx] ? row[taxBandIdx] : undefined,
                    tenented: tenentedIdx !== -1 ? parseBool(row[tenentedIdx]) : true,
                    tenancyStartDate: tenancyStartIdx !== -1 && row[tenancyStartIdx] ? row[tenancyStartIdx] : "",
                    tenancyType: tenancyTypeIdx !== -1 && row[tenancyTypeIdx] ? row[tenancyTypeIdx] : null,
                    fixedTermEndDate: fixedEndIdx !== -1 && row[fixedEndIdx] ? row[fixedEndIdx] : "",
                    rentPaymentStatus: rentPaymentIdx !== -1 && row[rentPaymentIdx] ? row[rentPaymentIdx] : null,
                    rentCollectionStatus: rentCollectionIdx !== -1 && row[rentCollectionIdx] ? row[rentCollectionIdx] : undefined,
                    arrearsStatus: arrearsIdx !== -1 ? (row[arrearsIdx] || "no-arrears") : "no-arrears",
                    depositProtected: depositIdx !== -1 ? parseBool(row[depositIdx]) : null,
                    noticeServed: noticeIdx !== -1 ? parseBool(row[noticeIdx]) : null,
                    tenantWantsToStay: stayIdx !== -1 && row[stayIdx] ? row[stayIdx] : null,
                    viewingArrangements: viewIdx !== -1 && row[viewIdx] ? row[viewIdx] : null,
                    rentReviewDate: rentReviewIdx !== -1 && row[rentReviewIdx] ? row[rentReviewIdx] : "",
                    tenancyNotes: notesIdx !== -1 ? (row[notesIdx] || "") : "",
                    epc: epcIdx !== -1 && row[epcIdx] && row[epcIdx] !== "none" ? row[epcIdx] : "",
                    potentialEpc: potentialEpcIdx !== -1 && row[potentialEpcIdx] && row[potentialEpcIdx] !== "none" ? row[potentialEpcIdx] : "",
                    displayOnHomepage: displayHomeIdx !== -1 ? parseBool(row[displayHomeIdx]) : false,
                    isFeatured: featuredIdx !== -1 ? parseBool(row[featuredIdx]) : false,
                    isHighYield: highYieldIdx !== -1 ? parseBool(row[highYieldIdx]) : false,
                    status: statusIdx !== -1 ? (row[statusIdx] || "draft") : "draft",
                    latitude: latIdx !== -1 && row[latIdx] && !isNaN(Number(row[latIdx])) ? Number(row[latIdx]) : undefined,
                    longitude: lonIdx !== -1 && row[lonIdx] && !isNaN(Number(row[lonIdx])) ? Number(row[lonIdx]) : undefined,
                };

                const rowErrors = validatePropertyRow(p, idx + 1);
                if (rowErrors.length > 0) {
                    errors.push(`Row ${idx + 2}: ${rowErrors.join(', ')}`);
                }

                propertiesToValidate.push(p);
            });

            setValidationErrors(errors);
            setParsedProperties(propertiesToValidate);
        };
        reader.readAsText(file);
    };

    const parseCSV = (text: string): string[][] => {
        const lines: string[][] = [];
        let row: string[] = [];
        let inQuotes = false;
        let currentValue = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    currentValue += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(currentValue.trim());
                currentValue = '';
            } else if ((char === '\r' || char === '\n') && !inQuotes) {
                if (char === '\r' && nextChar === '\n') {
                    i++;
                }
                row.push(currentValue.trim());
                if (row.length > 1 || row[0] !== '') {
                    lines.push(row);
                }
                row = [];
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        if (currentValue !== '' || row.length > 0) {
            row.push(currentValue.trim());
            lines.push(row);
        }
        return lines;
    };

    const parseXMLSpreadsheet = (text: string): string[][] => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            
            const parserError = xmlDoc.getElementsByTagName("parsererror");
            if (parserError.length > 0) return [];
            
            const rows: string[][] = [];
            const rowNodes = xmlDoc.getElementsByTagName("Row");
            
            for (let i = 0; i < rowNodes.length; i++) {
                const cellNodes = rowNodes[i].getElementsByTagName("Cell");
                const rowValues: string[] = [];
                let currentIdx = 0;
                
                for (let j = 0; j < cellNodes.length; j++) {
                    const cellNode = cellNodes[j];
                    const indexAttr = cellNode.getAttribute("ss:Index");
                    if (indexAttr) {
                        const targetIdx = parseInt(indexAttr, 10) - 1;
                        while (currentIdx < targetIdx) {
                            rowValues[currentIdx] = "";
                            currentIdx++;
                        }
                    }
                    const dataNode = cellNode.getElementsByTagName("Data")[0];
                    rowValues[currentIdx] = dataNode ? (dataNode.textContent || "").trim() : "";
                    currentIdx++;
                }
                
                const normalizedRow: string[] = [];
                for (let k = 0; k < currentIdx; k++) {
                    normalizedRow.push(rowValues[k] || "");
                }
                
                if (normalizedRow.some(v => v !== "")) {
                    rows.push(normalizedRow);
                }
            }
            return rows;
        } catch (e) {
            console.error("XML parse error", e);
            return [];
        }
    };

    const handleBulkSubmit = () => {
        if (!parsedProperties || validationErrors.length > 0) return;

        bulkCreateMutation.mutate(parsedProperties, {
            onSuccess: () => {
                toast.custom((t) => (
                    <IconNotification
                        title="Bulk Upload Successful"
                        description={`Successfully uploaded ${parsedProperties.length} properties.`}
                        color="success"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
                setIsBulkOpen(false);
                setParsedProperties(null);
                setValidationErrors([]);
                setSelectedFileName(null);
                refetch();
            },
            onError: (err: any) => {
                const apiErrors = err.response?.data?.data?.errors;
                if (Array.isArray(apiErrors)) {
                    setValidationErrors(apiErrors);
                } else {
                    toast.custom((t) => (
                        <IconNotification
                            title="Upload Failed"
                            description={err.response?.data?.message || err.message || "Something went wrong."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                }
            }
        });
    };

    const handleDownloadTemplate = () => {
        const xmlString = `<?xml version="1.0" encoding="utf-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>L2L Landlords</Author>
 </DocumentProperties>
 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
  <WindowHeight>9000</WindowHeight>
  <WindowWidth>15000</WindowWidth>
  <WindowTopX>240</WindowTopX>
  <WindowTopY>75</WindowTopY>
  <ProtectStructure>False</ProtectStructure>
  <ProtectWindows>False</ProtectWindows>
 </ExcelWorkbook>
 <Worksheet ss:Name="Properties Template">
  <Table>
   <Column ss:Width="150"/>
   <Column ss:Width="250"/>
   <Column ss:Width="100"/>
   <Column ss:Width="80"/>
   <Column ss:Width="80"/>
   <Column ss:Width="150"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="80"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="120"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="80"/>
   <Column ss:Width="120"/>
   <Column ss:Width="100"/>
   <Column ss:Width="120"/>
   <Column ss:Width="120"/>
   <Column ss:Width="120"/>
   <Column ss:Width="120"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="120"/>
   <Column ss:Width="120"/>
   <Column ss:Width="120"/>
   <Column ss:Width="150"/>
   <Column ss:Width="80"/>
   <Column ss:Width="80"/>
   <Column ss:Width="120"/>
   <Column ss:Width="120"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="80"/>
   <Column ss:Width="80"/>
   <Row ss:AutoFitHeight="0" ss:Height="20">
    <Cell><Data ss:Type="String">Title</Data></Cell>
    <Cell><Data ss:Type="String">Description</Data></Cell>
    <Cell><Data ss:Type="String">Property Type</Data></Cell>
    <Cell><Data ss:Type="String">Bedrooms</Data></Cell>
    <Cell><Data ss:Type="String">Bathrooms</Data></Cell>
    <Cell><Data ss:Type="String">Address</Data></Cell>
    <Cell><Data ss:Type="String">Location</Data></Cell>
    <Cell><Data ss:Type="String">Postcode</Data></Cell>
    <Cell><Data ss:Type="String">Floor Area (sqft)</Data></Cell>
    <Cell><Data ss:Type="String">Tenure</Data></Cell>
    <Cell><Data ss:Type="String">Asking Price</Data></Cell>
    <Cell><Data ss:Type="String">Price Type</Data></Cell>
    <Cell><Data ss:Type="String">Monthly Rent</Data></Cell>
    <Cell><Data ss:Type="String">Lease Years Remaining</Data></Cell>
    <Cell><Data ss:Type="String">Service Charge</Data></Cell>
    <Cell><Data ss:Type="String">Ground Rent</Data></Cell>
    <Cell><Data ss:Type="String">Council Tax Band</Data></Cell>
    <Cell><Data ss:Type="String">Tenanted</Data></Cell>
    <Cell><Data ss:Type="String">Tenancy Start Date</Data></Cell>
    <Cell><Data ss:Type="String">Tenancy Type</Data></Cell>
    <Cell><Data ss:Type="String">Fixed Term End Date</Data></Cell>
    <Cell><Data ss:Type="String">Rent Payment Status</Data></Cell>
    <Cell><Data ss:Type="String">Rent Collection</Data></Cell>
    <Cell><Data ss:Type="String">Arrears Status</Data></Cell>
    <Cell><Data ss:Type="String">Deposit Protected</Data></Cell>
    <Cell><Data ss:Type="String">Notice Served</Data></Cell>
    <Cell><Data ss:Type="String">Tenant Wants to Stay</Data></Cell>
    <Cell><Data ss:Type="String">Viewing Arrangements</Data></Cell>
    <Cell><Data ss:Type="String">Rent Review Date</Data></Cell>
    <Cell><Data ss:Type="String">Tenancy Notes</Data></Cell>
    <Cell><Data ss:Type="String">Current EPC</Data></Cell>
    <Cell><Data ss:Type="String">Potential EPC</Data></Cell>
    <Cell><Data ss:Type="String">Feature on Homepage</Data></Cell>
    <Cell><Data ss:Type="String">Featured Investment</Data></Cell>
    <Cell><Data ss:Type="String">High Yield</Data></Cell>
    <Cell><Data ss:Type="String">Listing Status</Data></Cell>
    <Cell><Data ss:Type="String">Latitude</Data></Cell>
    <Cell><Data ss:Type="String">Longitude</Data></Cell>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="20">
    <Cell><Data ss:Type="String">Manchester Investment Property</Data></Cell>
    <Cell><Data ss:Type="String">Beautiful flat in Manchester city center...</Data></Cell>
    <Cell><Data ss:Type="String">flat</Data></Cell>
    <Cell><Data ss:Type="Number">2</Data></Cell>
    <Cell><Data ss:Type="Number">1</Data></Cell>
    <Cell><Data ss:Type="String">Flat 4, 12 Oakfield Rd, Manchester</Data></Cell>
    <Cell><Data ss:Type="String">Manchester</Data></Cell>
    <Cell><Data ss:Type="String">M5</Data></Cell>
    <Cell><Data ss:Type="Number">750</Data></Cell>
    <Cell><Data ss:Type="String">leasehold</Data></Cell>
    <Cell><Data ss:Type="Number">150000</Data></Cell>
    <Cell><Data ss:Type="String">fixed-price</Data></Cell>
    <Cell><Data ss:Type="Number">950</Data></Cell>
    <Cell><Data ss:Type="Number">110</Data></Cell>
    <Cell><Data ss:Type="Number">1200</Data></Cell>
    <Cell><Data ss:Type="Number">150</Data></Cell>
    <Cell><Data ss:Type="String">B</Data></Cell>
    <Cell><Data ss:Type="String">yes</Data></Cell>
    <Cell><Data ss:Type="String">2024-01-15</Data></Cell>
    <Cell><Data ss:Type="String">ast</Data></Cell>
    <Cell><Data ss:Type="String">2025-01-14</Data></Cell>
    <Cell><Data ss:Type="String">up-to-date</Data></Cell>
    <Cell><Data ss:Type="String">agent-managed</Data></Cell>
    <Cell><Data ss:Type="String">no-arrears</Data></Cell>
    <Cell><Data ss:Type="String">yes</Data></Cell>
    <Cell><Data ss:Type="String">no</Data></Cell>
    <Cell><Data ss:Type="String">yes</Data></Cell>
    <Cell><Data ss:Type="String">tenant-notify-24h</Data></Cell>
    <Cell><Data ss:Type="String">2024-12-15</Data></Cell>
    <Cell><Data ss:Type="String">Reliable tenant, clean history...</Data></Cell>
    <Cell><Data ss:Type="String">C</Data></Cell>
    <Cell><Data ss:Type="String">B</Data></Cell>
    <Cell><Data ss:Type="String">yes</Data></Cell>
    <Cell><Data ss:Type="String">no</Data></Cell>
    <Cell><Data ss:Type="String">yes</Data></Cell>
    <Cell><Data ss:Type="String">draft</Data></Cell>
    <Cell><Data ss:Type="Number">53.4808</Data></Cell>
    <Cell><Data ss:Type="Number">-2.2426</Data></Cell>
   </Row>
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <Selected/>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C3:R500C3</Range>
   <Type>List</Type>
   <Value>&quot;flat,terraced,semi-detached,detached,maisonette,bungalow&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
   <ErrorMessage>Please select a valid property type.</ErrorMessage>
   <ErrorTitle>Invalid Type</ErrorTitle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C10:R500C10</Range>
   <Type>List</Type>
   <Value>&quot;freehold,leasehold,share-of-freehold&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
   <ErrorMessage>Please select a valid tenure.</ErrorMessage>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C12:R500C12</Range>
   <Type>List</Type>
   <Value>&quot;guide-price,fixed-price,offers-over&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C17:R500C17</Range>
   <Type>List</Type>
   <Value>&quot;A,B,C,D,E,F,G,H&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C18:R500C18</Range>
   <Type>List</Type>
   <Value>&quot;yes,no&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C20:R500C20</Range>
   <Type>List</Type>
   <Value>&quot;ast,non-ast,company-let,license&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C22:R500C22</Range>
   <Type>List</Type>
   <Value>&quot;up-to-date,partially-paid,overdue&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C23:R500C23</Range>
   <Type>List</Type>
   <Value>&quot;agent-managed,direct-to-landlord,guaranteed&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C24:R500C24</Range>
   <Type>List</Type>
   <Value>&quot;no-arrears,historical-resolved,active-arrears&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C25:R500C25</Range>
   <Type>List</Type>
   <Value>&quot;yes,no&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C26:R500C26</Range>
   <Type>List</Type>
   <Value>&quot;yes,no&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C27:R500C27</Range>
   <Type>List</Type>
   <Value>&quot;yes,no,unknown&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C28:R500C28</Range>
   <Type>List</Type>
   <Value>&quot;vacant-access,accompanied,tenant-notify-24h,tenant-notify-48h&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C33:R500C33</Range>
   <Type>List</Type>
   <Value>&quot;yes,no&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C34:R500C34</Range>
   <Type>List</Type>
   <Value>&quot;yes,no&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C35:R500C35</Range>
   <Type>List</Type>
   <Value>&quot;yes,no&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R2C36:R500C36</Range>
   <Type>List</Type>
   <Value>&quot;draft,pending-review,published,under-offer,sold,archived&quot;</Value>
   <ErrorStyle>Stop</ErrorStyle>
  </DataValidation>
 </Worksheet>
</Workbook>`;

        const blob = new Blob([xmlString], { type: "application/vnd.ms-excel;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "l2l_bulk_properties_template.xls");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportCSV = async () => {
        setIsExporting(true);
        try {
            const allProperties = await fetchAllProperties({
                status: params.status || undefined,
                location: search ? search : undefined,
                createdBy: activeTab === 'my' && user?.id ? user.id : undefined,
            });

            if (allProperties.length === 0) {
                toast.custom((t) => (
                    <IconNotification
                        title="No Properties to Export"
                        description="There are no properties matching the current filters to export."
                        color="warning"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
                return;
            }

            const headers = [
                "Property ID",
                "Title",
                "Address",
                "Location",
                "Postcode",
                "Type",
                "Bedrooms",
                "Bathrooms",
                "Tenure",
                "Asking Price",
                "Price Type",
                "Monthly Rent",
                "Annual Rent",
                "Gross Yield",
                "Lease Years Remaining",
                "Service Charge",
                "Ground Rent",
                "Council Tax Band",
                "Occupancy Status",
                "EPC Rating",
                "Potential EPC",
                "Status",
                "Feature on Homepage",
                "Featured Listing",
                "Posted By",
                "Created At",
            ];

            const escapeCSV = (val: any) => {
                if (val === null || val === undefined) return "";
                const str = String(val);
                if (str.includes(",") || str.includes('"') || str.includes("\n")) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            };

            const rows = allProperties.map((p) => {
                const postedByStr = p.createdBy && typeof p.createdBy === "object" 
                    ? `${p.createdBy.fullname} (${p.createdBy.email} - ${p.createdBy.role})` 
                    : "N/A";
                
                return [
                    p._id || p.id,
                    p.title,
                    p.address,
                    p.location,
                    p.postcode,
                    p.propertyType,
                    p.bedrooms,
                    p.bathrooms,
                    p.tenure,
                    p.investmentMetrics?.askingPrice ?? 0,
                    p.priceType || "N/A",
                    p.investmentMetrics?.monthlyRent ?? 0,
                    p.investmentMetrics?.annualRent || (p.investmentMetrics?.monthlyRent ? p.investmentMetrics.monthlyRent * 12 : 0),
                    p.investmentMetrics?.grossYield ?? 0,
                    p.investmentMetrics?.leaseYearsRemaining ?? "N/A",
                    p.serviceCharge ?? 0,
                    p.groundRent ?? 0,
                    p.councilTaxBand || "N/A",
                    p.tenented ? "Tenanted" : "Vacant",
                    p.epc || "N/A",
                    p.potentialEpc || "N/A",
                    p.status,
                    p.displayOnHomepage ? "Yes" : "No",
                    p.isFeatured ? "Yes" : "No",
                    postedByStr,
                    p.createdAt,
                ];
            });

            const csvContent = [
                headers.join(","),
                ...rows.map((row) => row.map(escapeCSV).join(",")),
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            
            const fileStatus = params.status ? String(params.status).replace(/\s+/g, "_").toLowerCase() : "all";
            link.setAttribute(
                "download",
                `l2l_properties_${activeTab}_${fileStatus}_export_${new Date().toISOString().split('T')[0]}.csv`
            );
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.custom((t) => (
                <IconNotification
                    title="Export Successful"
                    description={`Successfully exported ${allProperties.length} properties to CSV.`}
                    color="success"
                    onClose={() => toast.dismiss(t)}
                />
            ));
        } catch (err: any) {
            toast.custom((t) => (
                <IconNotification
                    title="Export Failed"
                    description={err.message || "An error occurred during CSV generation."}
                    color="error"
                    onClose={() => toast.dismiss(t)}
                />
            ));
        } finally {
            setIsExporting(false);
        }
    };

    const handleTabChange = (tab: 'all' | 'my') => {
        setActiveTab(tab);
        setParams((p) => ({
            ...p,
            page: 1,
        }));
    };

    const { data, isLoading, isError, refetch } = useProperties({
        ...params,
        location: search || undefined,
        createdBy: activeTab === 'my' && user?.id ? user.id : undefined,
    });

    const { data: statsData, isLoading: statsLoading } = usePropertyStats({
        location: search || undefined,
        createdBy: activeTab === 'my' && user?.id ? user.id : undefined,
    });

    const handleCardClick = (status: PropertyStatus) => {
        setParams(p => ({
            ...p,
            status: p.status === status ? "all" : status,
            page: 1
        }));
    };

    const deleteProperty = useDeleteProperty();

    const confirmDelete = () => {
        if (!propertyToDelete) return;
        deleteProperty.mutate(propertyToDelete._id, {
            onSuccess: () => {
                toast.custom((t) => (
                    <IconNotification
                        title="Deleted"
                        description="Property deleted successfully."
                        color="success"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
                setPropertyToDelete(null);
            },
            onError: () =>
                toast.custom((t) => (
                    <IconNotification
                        title="Error"
                        description="Failed to delete property."
                        color="error"
                        onClose={() => toast.dismiss(t)}
                    />
                )),
        });
    };

    const totalResults = data?.totalResults ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const properties = data?.results ?? [];

    return (
        <div className="flex-1 px-4 py-6 md:px-8 md:py-8 space-y-6">
                    {/* Page Title + Add Button */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                                Property Listings
                            </h1>
                            <p className="mt-1 text-sm text-tertiary">
                                {totalResults} {totalResults === 1 ? "listing" : "listings"} total
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                color="secondary"
                                size="md"
                                iconLeading={UploadCloud02}
                                onClick={() => setIsBulkOpen(true)}
                            >
                                Bulk Upload
                            </Button>
                            <Button
                                color="primary"
                                size="md"
                                iconLeading={Plus}
                                href="/dashboard/properties/new"
                            >
                                Add Property
                            </Button>
                        </div>
                    </div>

                    {/* Metrics Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {[
                            { status: "published" as const, label: "Published", dotClass: "bg-success-500" },
                            { status: "draft" as const, label: "Draft", dotClass: "bg-utility-gray-500" },
                            { status: "pending-review" as const, label: "Pending Review", dotClass: "bg-warning-500" },
                            { status: "under-offer" as const, label: "Under Offer", dotClass: "bg-blue-500" },
                            { status: "sold" as const, label: "Sold", dotClass: "bg-error-500" },
                            { status: "archived" as const, label: "Archived", dotClass: "bg-utility-gray-400" },
                        ].map((item) => {
                            const count = statsData?.[item.status] ?? 0;
                            const isSelected = params.status === item.status;
                            return (
                                <button
                                    key={item.status}
                                    onClick={() => handleCardClick(item.status)}
                                    className={`text-left rounded-xl p-4 shadow-xs ring-1 ring-secondary ring-inset flex flex-col gap-1 transition-all duration-200 hover:shadow-md hover:ring-brand-500 bg-primary group cursor-pointer ${
                                        isSelected ? "ring-2 ring-brand-500 bg-secondary_subtle" : ""
                                    }`}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-xs font-semibold text-tertiary uppercase tracking-wider truncate mr-2">{item.label}</span>
                                        <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${item.dotClass}`} />
                                    </div>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-2xl font-bold text-primary">
                                            {statsLoading ? (
                                                <span className="block h-8 w-12 rounded bg-secondary_hover animate-pulse mt-1" />
                                            ) : (
                                                count
                                            )}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Property Filter Tabs */}
                    <div className="flex gap-0.5 rounded-xl bg-secondary_alt p-1 ring-1 ring-inset ring-secondary w-fit">
                        <button
                            onClick={() => handleTabChange('all')}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer ${
                                activeTab === 'all'
                                    ? "bg-primary text-secondary shadow-xs ring-1 ring-inset ring-primary"
                                    : "text-tertiary hover:text-secondary"
                            }`}
                        >
                            All Properties
                        </button>
                        <button
                            onClick={() => handleTabChange('my')}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer ${
                                activeTab === 'my'
                                    ? "bg-primary text-secondary shadow-xs ring-1 ring-inset ring-primary"
                                    : "text-tertiary hover:text-secondary"
                            }`}
                        >
                            My Properties
                        </button>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {/* Search */}
                        <div className="flex-1 max-w-sm">
                            <Input
                                icon={SearchLg}
                                type="text"
                                value={search}
                                onChange={setSearch}
                                placeholder="Search by location…"
                                size="md"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <FilterLines className="h-4 w-4 shrink-0 text-fg-quaternary" />
                            {STATUS_FILTERS.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setParams((p) => ({ ...p, status: f.value, page: 1 }))}
                                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-150 ${
                                        params.status === f.value
                                            ? "bg-brand-500 text-white"
                                            : "bg-secondary text-secondary hover:bg-secondary_hover"
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <TableCard.Root>
                        <TableCard.Header
                            title="Properties"
                            badge={String(totalResults)}
                            description="All property listings managed through the CMS"
                            contentTrailing={
                                <Button
                                    color="secondary"
                                    size="md"
                                    iconLeading={DownloadCloud02}
                                    onClick={handleExportCSV}
                                    isLoading={isExporting}
                                    isDisabled={isExporting}
                                >
                                    Export CSV
                                </Button>
                            }
                        />

                        {isError ? (
                            <div className="flex items-center justify-center py-20">
                                <p className="text-sm text-error-primary">Failed to load properties. Please try again.</p>
                            </div>
                        ) : (
                            <Table aria-label="Properties table" selectionMode="none">
                                <Table.Header>
                                    <Table.Head label="Property" isRowHeader />
                                    <Table.Head label="Location" />
                                    <Table.Head label="Type" />
                                    <Table.Head label="Beds" />
                                    <Table.Head label="Asking Price" />
                                    <Table.Head label="Monthly Rent" />
                                    <Table.Head label="Yield" />
                                    <Table.Head label="Posted By" />
                                    <Table.Head label="Status" />
                                    <Table.Head label="" />
                                </Table.Header>

                                <Table.Body>
                                    {isLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} id={`skeleton-${i}`} />)
                                    ) : properties.length === 0 ? (
                                        <Table.Row>
                                            <Table.Cell colSpan={10}>
                                                <EmptyState onAdd={() => window.location.href = "/dashboard/properties/new"} />
                                            </Table.Cell>
                                        </Table.Row>
                                    ) : (
                                        properties.map((property) => {
                                            const status = statusConfig[property.status] ?? { label: property.status, color: "gray" as const };
                                            return (
                                                <Table.Row key={property._id} id={property._id}>
                                                    {/* Title + Image */}
                                                    <Table.Cell>
                                                        <div className="flex items-center gap-3">
                                                            {property.heroImage ? (
                                                                <img
                                                                    src={property.heroImage}
                                                                    alt={property.title}
                                                                    className="h-10 w-14 shrink-0 rounded-md object-cover"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).style.display = "none";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-secondary">
                                                                    <Building02 className="h-5 w-5 text-fg-quaternary" />
                                                                </div>
                                                            )}
                                                            <div className="min-w-0">
                                                                <p className="truncate text-sm font-semibold text-primary max-w-[200px]">
                                                                    {property.title}
                                                                </p>
                                                                <p className="text-xs text-quaternary">{property.postcode}</p>
                                                            </div>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>{property.location}</Table.Cell>

                                                    <Table.Cell className="capitalize">{property.propertyType}</Table.Cell>

                                                    <Table.Cell>{property.bedrooms} bed</Table.Cell>

                                                    <Table.Cell>
                                                        <span className="font-medium text-primary">
                                                            {formatCurrency(property.investmentMetrics?.askingPrice ?? 0)}
                                                        </span>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        {formatCurrency(property.investmentMetrics?.monthlyRent ?? 0)}/mo
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <span className={`font-semibold ${(property.investmentMetrics?.grossYield ?? 0) >= 5 ? "text-success-primary" : "text-tertiary"}`}>
                                                            {(property.investmentMetrics?.grossYield ?? 0).toFixed(2)}%
                                                        </span>
                                                    </Table.Cell>

                                                    {/* Posted By */}
                                                    <Table.Cell>
                                                        {property.createdBy && typeof property.createdBy === "object" ? (
                                                            <Badge
                                                                color={
                                                                    property.createdBy.role === "admin"
                                                                        ? "brand"
                                                                        : property.createdBy.role === "concierge"
                                                                        ? "blue"
                                                                        : "gray"
                                                                }
                                                                size="sm"
                                                                type="pill-color"
                                                                className="capitalize"
                                                            >
                                                                {property.createdBy.role}
                                                            </Badge>
                                                        ) : (
                                                            <span className="text-sm text-tertiary">—</span>
                                                        )}
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <Badge color={status.color} size="sm" type="pill-color">
                                                            {status.label}
                                                        </Badge>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <PropertyRowActions
                                                            property={property}
                                                            onDelete={(p) => setPropertyToDelete(p)}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    )}
                                </Table.Body>
                            </Table>
                        )}

                        {/* Pagination Footer */}
                        {!isLoading && totalPages > 1 && (
                            <div className="px-5 py-4 border-t border-secondary">
                                <PaginationPageDefault
                                    page={params.page ?? 1}
                                    total={totalPages}
                                    onPageChange={(page) => setParams((p) => ({ ...p, page }))}
                                />
                            </div>
                        )}
                    </TableCard.Root>

            {/* Delete Confirmation Modal */}
            {propertyToDelete && (
                <ModalOverlay
                    isOpen={!!propertyToDelete}
                    onOpenChange={(open) => {
                        if (!open) setPropertyToDelete(null);
                    }}
                    isDismissable
                >
                    <Modal>
                        <Dialog>
                            <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100 border border-secondary text-left">
                                <CloseButton
                                    onClick={() => setPropertyToDelete(null)}
                                    theme="light"
                                    size="lg"
                                    className="absolute top-3 right-3"
                                />
                                <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                    <div className="z-10 flex flex-col gap-0.5">
                                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                            Delete property listing
                                        </AriaHeading>
                                        <p className="text-sm text-tertiary">
                                            Are you sure you want to delete <span className="font-semibold text-primary">{propertyToDelete.title}</span>? This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                                <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        onClick={() => setPropertyToDelete(null)}
                                        isDisabled={deleteProperty.isPending}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary-destructive"
                                        size="md"
                                        onClick={confirmDelete}
                                        isDisabled={deleteProperty.isPending}
                                    >
                                        {deleteProperty.isPending ? "Deleting..." : "Delete"}
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            )}

            {/* Bulk Upload Modal */}
            <ModalOverlay
                isOpen={isBulkOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsBulkOpen(false);
                        setParsedProperties(null);
                        setValidationErrors([]);
                        setSelectedFileName(null);
                    }
                }}
                isDismissable
            >
                <Modal>
                    <Dialog>
                        <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-primary shadow-xl border border-secondary text-left">
                            <CloseButton
                                onClick={() => {
                                    setIsBulkOpen(false);
                                    setParsedProperties(null);
                                    setValidationErrors([]);
                                    setSelectedFileName(null);
                                }}
                                theme="light"
                                size="lg"
                                className="absolute top-4 right-4"
                            />

                            <div className="px-6 pt-6 pb-4 border-b border-secondary">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Bulk Upload Properties
                                </AriaHeading>
                                <p className="text-sm text-tertiary mt-0.5">
                                    Import multiple properties using a CSV or Excel template file.
                                </p>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Instructions & Download Template */}
                                <div className="rounded-xl bg-secondary_subtle border border-secondary p-4 space-y-3">
                                    <div className="text-sm text-secondary leading-relaxed">
                                        Please download our template to ensure your property data matches our required formats, including dropdown select lists for enum fields.
                                    </div>
                                    <Button
                                        color="secondary"
                                        size="sm"
                                        iconLeading={DownloadCloud02}
                                        onClick={handleDownloadTemplate}
                                    >
                                        Download Template (Excel)
                                    </Button>
                                </div>

                                {/* File Dropzone / Uploader */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary">
                                        Template File
                                    </label>
                                    {!selectedFileName ? (
                                        <FileUpload.DropZone
                                            accept=".csv,.xls"
                                            allowsMultiple={false}
                                            onDropFiles={handleFileDrop}
                                            hint="CSV or Excel (.xls) files only (up to 10MB)"
                                            maxSize={10 * 1024 * 1024}
                                        />
                                    ) : (
                                        <div className="rounded-xl border border-secondary bg-primary p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <File02 className="size-8 text-fg-quaternary" />
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-medium text-secondary truncate max-w-xs">{selectedFileName}</span>
                                                    <span className="text-xs text-tertiary">{(selectedFileSize / 1024).toFixed(1)} KB</span>
                                                </div>
                                            </div>
                                            <Button
                                                color="secondary"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedFileName(null);
                                                    setParsedProperties(null);
                                                    setValidationErrors([]);
                                                }}
                                            >
                                                Change File
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Validation Feedback */}
                                {validationErrors.length > 0 && (
                                    <div className="rounded-xl border border-error-300 bg-error-50 dark:bg-error-950/20 dark:border-error-800 p-4 space-y-2">
                                        <div className="flex items-center gap-2 text-error-primary text-sm font-semibold">
                                            <AlertCircle className="size-4 shrink-0" />
                                            <span>Validation errors detected ({validationErrors.length})</span>
                                        </div>
                                        <ul className="text-xs text-error-primary pl-5 list-disc max-h-40 overflow-y-auto space-y-1">
                                            {validationErrors.map((err, i) => (
                                                <li key={i}>{err}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {parsedProperties && validationErrors.length === 0 && (
                                    <div className="rounded-xl border border-success-300 bg-success-50 dark:bg-success-950/20 dark:border-success-800 p-4 flex items-center gap-2 text-success-primary text-sm font-medium">
                                        <span className="font-semibold">✓ Parsed {parsedProperties.length} properties successfully.</span>
                                        <span>Ready for submission.</span>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 pt-2 border-t border-secondary">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        type="button"
                                        onClick={() => {
                                            setIsBulkOpen(false);
                                            setParsedProperties(null);
                                            setValidationErrors([]);
                                            setSelectedFileName(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        size="md"
                                        onClick={handleBulkSubmit}
                                        isLoading={bulkCreateMutation.isPending}
                                        isDisabled={!parsedProperties || validationErrors.length > 0 || bulkCreateMutation.isPending}
                                    >
                                        Submit Upload
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </div>
    );
}
